import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from '@/users'
import { DebtType, DebtEntity } from './enum/type.enum'

@Entity('debts')
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: DebtType,
  })
  type: DebtType

  @Column({ nullable: true })
  otherType: string

  @Column({
    type: 'enum',
    enum: DebtEntity,
  })
  entity: DebtEntity

  @Column({ nullable: true })
  otherEntity: string

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number

  @Column({ default: false })
  guarantee: boolean

  @Column({ nullable: true, type: 'text' })
  description: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

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

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date
}
