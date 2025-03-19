import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { subMonths } from 'date-fns'
import { MoreThanOrEqual, Between } from 'typeorm'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  create(data: CreateUserDto) {
    return this.repository.create(data)
  }

  save(user: User) {
    return this.repository.save(user)
  }

  findOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.repository.findOne({ where: query })
  }

  findAll() {
    return this.repository.find()
  }

  findByEmail(email: string) {
    return this.findOne({ email })
  }

  findByDocumentNumber(documentNumber: string) {
    return this.findOne({ documentNumber })
  }

  update(id: string, data: UpdateUserDto) {
    return this.repository.update(id, data)
  }

  async softDelete(id: string) {
    // First soft delete all negotiations related to the user's debts
    await this.repository
      .createQueryBuilder()
      .update('negotiations')
      .set({ deletedAt: new Date() })
      .where('debtId IN (SELECT id FROM debts WHERE userId = :userId)', {
        userId: id,
      })
      .execute()

    // Then soft delete all debts related to the user
    await this.repository
      .createQueryBuilder()
      .update('debts')
      .set({ deletedAt: new Date() })
      .where('userId = :userId', { userId: id })
      .execute()

    // Finally soft delete the user
    return this.repository.softDelete(id)
  }

  async findOneById(id: string) {
    // First get the user
    const user = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        documentNumber: true,
        phoneCode: true,
        phoneNumber: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return null
    }

    // Then get debts with their negotiations
    const debtsWithNegotiations = await this.repository
      .createQueryBuilder('user')
      .select([
        'debt.id',
        'debt.type',
        'debt."otherType"',
        'debt.entity',
        'debt."otherEntity"',
        'debt.amount',
        'debt.guarantee',
        'debt.description',
        'debt."createdAt" as "debt_createdAt"',
        'debt."updatedAt" as "debt_updatedAt"',
        'negotiation.id',
        'negotiation.status',
        'negotiation."amountNegotiated"',
        'negotiation."createdAt" as "negotiation_createdAt"',
        'negotiation."updatedAt" as "negotiation_updatedAt"',
      ])
      .innerJoin('debts', 'debt', 'debt.userId = :userId', { userId: id })
      .leftJoin('negotiations', 'negotiation', 'negotiation.debtId = debt.id')
      .getRawMany()

    // Transform the raw results into a structured format
    const debts = debtsWithNegotiations.reduce((acc, curr) => {
      const debtId = curr.debt_id
      if (!acc[debtId]) {
        acc[debtId] = {
          id: curr.debt_id,
          type: curr.debt_type,
          otherType: curr.otherType,
          entity: curr.debt_entity,
          otherEntity: curr.otherEntity,
          amount: curr.debt_amount,
          guarantee: curr.debt_guarantee,
          description: curr.debt_description,
          createdAt: curr.debt_createdAt,
          updatedAt: curr.debt_updatedAt,
          negotiation: curr.negotiation_id
            ? {
                id: curr.negotiation_id,
                status: curr.negotiation_status,
                amountNegotiated: curr.amountNegotiated,
                createdAt: curr.negotiation_createdAt,
                updatedAt: curr.negotiation_updatedAt,
              }
            : null,
        }
      }
      return acc
    }, {})

    return {
      ...user,
      debts: Object.values(debts),
    }
  }

  async getAdminMetrics(startOfCurrentMonth: Date) {
    const [totalUsers, newUsersThisMonth, lastMonthUsers] = await Promise.all([
      this.repository.count({
        where: {
          deletedAt: null,
        },
      }),
      this.repository.count({
        where: {
          createdAt: MoreThanOrEqual(startOfCurrentMonth),
          deletedAt: null,
        },
      }),
      this.repository.count({
        where: {
          createdAt: Between(
            subMonths(startOfCurrentMonth, 1),
            startOfCurrentMonth
          ),
          deletedAt: null,
        },
      }),
    ])

    const growthRate =
      lastMonthUsers > 0
        ? ((newUsersThisMonth - lastMonthUsers) / lastMonthUsers) * 100
        : newUsersThisMonth > 0 && lastMonthUsers === 0
          ? 100
          : 0

    return {
      totalUsers,
      newUsersThisMonth,
      activeUsers: totalUsers,
      growthRate,
    }
  }
}
