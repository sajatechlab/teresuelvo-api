import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { Debt } from '@/debts/debt.entity'
import { NegotiationStatus } from './enum/status.enum'

@Entity('negotiations')
export class Negotiation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  amountNegotiated: number

  @Column({
    type: 'enum',
    enum: NegotiationStatus,
    default: NegotiationStatus.PENDING_REVIEW,
  })
  status: NegotiationStatus

  @OneToOne(() => Debt, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'debtId' })
  debt: Debt

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date
}
