import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Debt } from './debt.entity'
import { UpdateDebtDto } from './dto/update-debt.dto'
import { Not, IsNull } from 'typeorm'

@Injectable()
export class DebtsRepository {
  constructor(
    @InjectRepository(Debt)
    private repository: Repository<Debt>
  ) {}

  create(data: Partial<Debt>) {
    return this.repository.create(data)
  }

  save(debt: Debt) {
    return this.repository.save(debt)
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } })
  }

  findByUser(userId: string) {
    return this.repository.find({ where: { user: { id: userId } } })
  }

  findAllByAdmin() {
    return this.repository
      .createQueryBuilder('debt')
      .leftJoinAndSelect('debt.user', 'user')
      .leftJoin('negotiations', 'negotiation', 'negotiation.debtId = debt.id')
      .select([
        'debt',
        'user',
        'CASE WHEN negotiation.id IS NOT NULL THEN true ELSE false END as "isNegotiated"',
      ])
      .where('user.id IS NOT NULL')
      .orderBy('debt.createdAt', 'DESC')
      .getRawAndEntities()
      .then(({ entities, raw }) => {
        return entities.map((debt, index) => ({
          ...debt,
          isNegotiated: raw[index].isNegotiated,
        }))
      })
  }

  findAllNotNegotiated(userId: string) {
    return this.repository
      .createQueryBuilder('debt')
      .where('debt.userId = :userId', { userId })
      .andWhere(
        'debt.id NOT IN (SELECT negotiation."debtId" FROM negotiations negotiation)'
      )
      .getMany()
  }

  async getDebtsPerEntity(userId: string) {
    return this.repository
      .createQueryBuilder('debt')
      .select(['debt.entityType', 'COUNT(*) as count'])
      .where('debt.userId = :userId', { userId })
      .groupBy('debt.entityType')
      .getRawMany()
  }

  async getDebtsPerMonth(userId: string, sixMonthsAgo: Date) {
    return this.repository
      .createQueryBuilder('debt')
      .select([
        "DATE_TRUNC('month', debt.createdAt) as month",
        'COUNT(*) as count',
      ])
      .where('debt.userId = :userId', { userId })
      .andWhere('debt.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
      .groupBy('month')
      .orderBy('month', 'DESC')
      .getRawMany()
  }

  async getDebtsPerType(userId: string) {
    return this.repository
      .createQueryBuilder('debt')
      .select(['debt.type', 'COUNT(*) as count'])
      .where('debt.userId = :userId', { userId })
      .groupBy('debt.type')
      .getRawMany()
  }

  async getDebtMetrics(userId: string, sixMonthsAgo: Date) {
    const [perEntity, perMonth, perType, totalAmount] = await Promise.all([
      this.repository
        .createQueryBuilder('debt')
        .select(['debt.entity as "entityType"', 'SUM(debt.amount) as count'])
        .where('debt.userId = :userId', { userId })
        .groupBy('debt.entity')
        .getRawMany(),

      this.repository
        .createQueryBuilder('debt')
        .select([
          "DATE_TRUNC('month', debt.createdAt) as month",
          'COUNT(*) as count',
        ])
        .where('debt.userId = :userId', { userId })
        .andWhere('debt.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
        .groupBy('month')
        .orderBy('month', 'DESC')
        .getRawMany(),

      this.repository
        .createQueryBuilder('debt')
        .select([
          'debt.type',
          'debt."otherType"',
          'COUNT(*) as count',
          'SUM(debt.amount) as amount',
        ])
        .where('debt.deletedAt IS NULL')
        .andWhere('debt.userId = :userId', { userId })
        .groupBy('debt.type')
        .addGroupBy('debt."otherType"')
        .getRawMany(),

      this.repository
        .createQueryBuilder('debt')
        .select('SUM(debt.amount)', 'totalAmount')
        .where('debt.userId = :userId', { userId })
        .getRawOne(),
    ])

    return { perEntity, perMonth, perType, totalAmount }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    return this.repository.update({ id }, updateDebtDto)
  }

  async delete(id: string) {
    return this.repository.update({ id }, { deletedAt: new Date() })
  }

  async getAdminMetrics(sixMonthsAgo: Date) {
    const [totalDebts, totalAmount, debtsByType, debtsByEntity, debtsOverTime] =
      await Promise.all([
        this.repository.count({
          where: {
            deletedAt: null,
          },
        }),
        this.repository
          .createQueryBuilder('debt')
          .select('SUM(debt.amount)', 'total')
          .where('debt.deletedAt IS NULL')
          .getRawOne(),
        this.repository
          .createQueryBuilder('debt')
          .select([
            'debt.type as "type"',
            'debt."otherType" as "otherType"',
            'COUNT(*) as count',
            'SUM(debt.amount) as amount',
          ])
          .where('debt.deletedAt IS NULL')
          .groupBy('debt.type')
          .addGroupBy('debt."otherType"')
          .getRawMany(),
        this.repository
          .createQueryBuilder('debt')
          .select([
            'debt.entity as "entity"',
            'debt."otherEntity" as "otherEntity"',
            'COUNT(*) as count',
            'SUM(debt.amount) as amount',
          ])
          .where('debt.deletedAt IS NULL')
          .groupBy('debt.entity')
          .addGroupBy('debt."otherEntity"')
          .getRawMany(),
        this.repository
          .createQueryBuilder('debt')
          .select([
            "DATE_TRUNC('month', debt.createdAt) as date",
            'COUNT(*) as count',
            'SUM(debt.amount) as amount',
          ])
          .where('debt.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
          .andWhere('debt.deletedAt IS NULL')
          .groupBy('date')
          .orderBy('date', 'ASC')
          .getRawMany(),
      ])

    const totalDebtAmount = Number(totalAmount?.total || 0)

    return {
      totalDebts,
      totalDebtAmount,
      averageDebtAmount: totalDebts > 0 ? totalDebtAmount / totalDebts : 0,
      debtByType: debtsByType.map(({ type, otherType, count, amount }) => ({
        type,
        otherType,
        count: Number(count),
        amount: Number(amount),
      })),
      debtByEntity: debtsByEntity.map(
        ({ entity, otherEntity, count, amount }) => ({
          entity,
          otherEntity,
          count: Number(count),
          amount: Number(amount),
        })
      ),
      debtsOverTime: debtsOverTime.map(({ date, count, amount }) => ({
        date: date.toISOString().slice(0, 7),
        count: Number(count),
        amount: Number(amount),
      })),
    }
  }
}
