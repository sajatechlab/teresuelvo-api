import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Negotiation } from './negotiation.entity'
import { UpdateNegotiationDto } from './dto/update-negotiation.dto'
@Injectable()
export class NegotiationsRepository {
  constructor(
    @InjectRepository(Negotiation)
    private repository: Repository<Negotiation>
  ) {}

  create(debtId: string) {
    const negotiation = this.repository.create({ debt: { id: debtId } })
    this.repository.save(negotiation)
    return negotiation
  }

  save(negotiation: Negotiation) {
    return this.repository.save(negotiation)
  }

  findOne(where: any) {
    return this.repository.findOne({ where })
  }

  findByDebt(debtId: string) {
    return this.repository.findOne({ where: { debt: { id: debtId } } })
  }

  async getTotalAmountSaved(userId: string) {
    return this.repository
      .createQueryBuilder('negotiation')
      .innerJoin('negotiation.debt', 'debt')
      .where('debt.userId = :userId', { userId })
      .select('SUM(debt.amount - negotiation.amountNegotiated)', 'totalSaved')
      .getRawOne()
  }

  async getPendingPaymentsCount(userId: string) {
    return this.repository
      .createQueryBuilder('negotiation')
      .innerJoin('negotiation.debt', 'debt')
      .where('debt.userId = :userId', { userId })
      .andWhere('negotiation.status = :status', { status: 'PENDING_PAYMENT' })
      .getCount()
  }

  async getNegotiationMetrics(userId: string) {
    const [
      totalSaved,
      pendingPayments,
      activeNegotiations,
      pendingPaymentAmount,
    ] = await Promise.all([
      this.repository
        .createQueryBuilder('negotiation')
        .innerJoin('negotiation.debt', 'debt')
        .where('debt.userId = :userId', { userId })
        .select('SUM(debt.amount - negotiation.amountNegotiated)', 'totalSaved')
        .getRawOne(),

      this.repository
        .createQueryBuilder('negotiation')
        .innerJoin('negotiation.debt', 'debt')
        .where('debt.userId = :userId', { userId })
        .andWhere('negotiation.status = :status', {
          status: 'PENDING_PAYMENT',
        })
        .getCount(),

      this.repository
        .createQueryBuilder('negotiation')
        .innerJoin('negotiation.debt', 'debt')
        .where('debt.userId = :userId', { userId })
        .andWhere('negotiation.status IN (:...statuses)', {
          statuses: ['PENDING_REVIEW', 'IN_NEGOTIATION'],
        })
        .getCount(),

      this.repository
        .createQueryBuilder('negotiation')
        .innerJoin('negotiation.debt', 'debt')
        .where('debt.userId = :userId', { userId })
        .andWhere('negotiation.status = :status', {
          status: 'PENDING_PAYMENT',
        })
        .select('SUM(negotiation.amountNegotiated)', 'pendingPaymentAmount')
        .getRawOne(),
    ])

    return {
      totalSaved: Number(totalSaved?.totalSaved) || 0,
      pendingPayments,
      activeNegotiations,
      pendingPaymentAmount:
        Number(pendingPaymentAmount?.pendingPaymentAmount) || 0,
    }
  }

  async findAllByUser(userId: string): Promise<Negotiation[]> {
    return this.repository
      .createQueryBuilder('negotiation')
      .innerJoinAndSelect('negotiation.debt', 'debt')
      .where('debt.userId = :userId', { userId })
      .getMany()
  }

  async findAllByAdmin(): Promise<Negotiation[]> {
    return this.repository
      .createQueryBuilder('negotiation')
      .leftJoinAndSelect('negotiation.debt', 'debt')
      .leftJoinAndSelect('debt.user', 'user')
      .where('user.id IS NOT NULL')
      .andWhere('debt.deletedAt IS NULL')
      .orderBy('negotiation.createdAt', 'DESC')
      .getMany()
  }

  async getNegotiationPageMetrics(userId: string) {
    const metrics = await this.repository
      .createQueryBuilder('negotiation')
      .innerJoin('negotiation.debt', 'debt')
      .where('debt.userId = :userId', { userId })
      .select([
        // In Negotiation metrics (PENDING_REVIEW or IN_NEGOTIATION)
        'COUNT(CASE WHEN negotiation.status IN (:...inNegotiationStatuses) THEN 1 END)::int AS "inNegotiationCount"',
        'COALESCE(SUM(CASE WHEN negotiation.status IN (:...inNegotiationStatuses) THEN debt.amount  END), 0)::decimal AS "inNegotiationTotal"',

        // Paid metrics
        'COUNT(CASE WHEN negotiation.status = :paidStatus THEN 1 END)::int AS "paidCount"',
        'COALESCE(SUM(CASE WHEN negotiation.status = :paidStatus THEN negotiation.amountNegotiated END), 0)::decimal AS "paidTotal"',
        'COALESCE(SUM(CASE WHEN negotiation.status = :paidStatus THEN debt.amount END), 0)::decimal AS "originalAmountPaid"',

        // Pending Payment metrics
        'COUNT(CASE WHEN negotiation.status = :pendingPaymentStatus THEN 1 END)::int AS "pendingPaymentCount"',
        'COALESCE(SUM(CASE WHEN negotiation.status = :pendingPaymentStatus THEN negotiation.amountNegotiated END), 0)::decimal AS "pendingPaymentTotal"',
      ])
      .setParameters({
        inNegotiationStatuses: ['PENDING_REVIEW', 'IN_NEGOTIATION'],
        paidStatus: 'PAID',
        pendingPaymentStatus: 'PENDING_PAYMENT',
      })
      .getRawOne()

    // Transform and return the metrics with proper types
    return {
      inNegotiationCount: parseInt(metrics.inNegotiationCount) || 0,
      inNegotiationTotal: parseFloat(metrics.inNegotiationTotal) || 0,
      paidCount: parseInt(metrics.paidCount) || 0,
      paidTotal: parseFloat(metrics.paidTotal) || 0,
      originalAmountPaid: parseFloat(metrics.originalAmountPaid) || 0,
      pendingPaymentCount: parseInt(metrics.pendingPaymentCount) || 0,
      pendingPaymentTotal: parseFloat(metrics.pendingPaymentTotal) || 0,
    }
  }

  async updateStatus(id: string, updatedNegotiationDto: UpdateNegotiationDto) {
    const updateData: Partial<UpdateNegotiationDto> = {}

    if (updatedNegotiationDto.status) {
      updateData.status = updatedNegotiationDto.status
    }

    if (updatedNegotiationDto.amountNegotiated) {
      updateData.amountNegotiated = updatedNegotiationDto.amountNegotiated
    }

    await this.repository.update(id, updateData)
    return this.findOne({ id })
  }

  async getAdminMetrics(sixMonthsAgo: Date) {
    const [statusCounts, savingsData, negotiationsOverTime] = await Promise.all(
      [
        this.repository
          .createQueryBuilder('negotiation')
          .select(['negotiation.status as "status"', 'COUNT(*) as count'])
          .where('negotiation."deletedAt" IS NULL')
          .groupBy('negotiation.status')
          .getRawMany(),
        this.repository
          .createQueryBuilder('negotiation')
          .leftJoin('negotiation.debt', 'debt')
          .select([
            'COUNT(*) as total',
            'SUM(debt.amount - negotiation."amountNegotiated") as savings',
            'SUM(debt.amount) as "originalAmount"',
          ])
          .where('negotiation.status = :status', { status: 'PAID' })
          .getRawOne(),
        this.repository
          .createQueryBuilder('negotiation')
          .leftJoin('negotiation.debt', 'debt')
          .select([
            "DATE_TRUNC('month', negotiation.createdAt) as date",
            'COUNT(*) as count',
            'SUM(debt.amount - negotiation.amountNegotiated) as "savingsAmount"',
          ])
          .where('negotiation.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
          .andWhere('negotiation.status = :status', { status: 'PAID' })
          .groupBy('date')
          .orderBy('date', 'ASC')
          .getRawMany(),
      ]
    )

    const statusMap = statusCounts.reduce((acc, { status, count }) => {
      acc[status] = Number(count)
      return acc
    }, {})

    const totalSavingsAmount = Number(savingsData?.savings || 0)
    const totalOriginalAmount = Number(savingsData?.originalAmount || 0)
    const successfulNegotiations = Number(statusMap['PAID'] || 0)

    return {
      totalNegotiations: statusCounts.reduce(
        (sum, { count }) => sum + Number(count),
        0
      ),
      activeNegotiations:
        Number(statusMap['IN_NEGOTIATION'] || 0) +
        Number(statusMap['PENDING_REVIEW'] || 0) +
        Number(statusMap['PENDING_PAYMENT'] || 0),
      successfulNegotiations,
      rejectedNegotiations: Number(statusMap['REJECTED'] || 0),
      pendingNegotiations: Number(statusMap['PENDING_REVIEW'] || 0),
      totalSavingsAmount,
      averageSavingsPercentage:
        successfulNegotiations > 0
          ? (totalSavingsAmount / totalOriginalAmount) * 100
          : 0,
      negotiationsOverTime: negotiationsOverTime.map(
        ({ date, count, savingsAmount }) => ({
          date: date.toISOString().slice(0, 7),
          count: Number(count),
          savingsAmount: Number(savingsAmount),
        })
      ),
    }
  }
}
