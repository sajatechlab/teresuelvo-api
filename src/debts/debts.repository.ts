import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Debt } from './debt.entity'
import { UpdateDebtDto } from './dto/update-debt.dto'

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
        .select(['debt.type as "type"', 'SUM(debt.amount) as count'])
        .where('debt.userId = :userId', { userId })
        .groupBy('debt.type')
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
}
