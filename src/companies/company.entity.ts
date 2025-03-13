import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from '@/users'
import { CompanyType, CompanyDocumentType } from './enum/type.enum'
import { DebtRange } from '@/debts/enum/type.enum'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: CompanyType,
  })
  type: CompanyType

  @Column({
    type: 'enum',
    enum: CompanyDocumentType,
  })
  documentType: CompanyDocumentType

  @Column({ unique: true })
  documentNumber: string

  @Column({
    type: 'enum',
    enum: DebtRange,
  })
  debtApprox: DebtRange

  @OneToOne(() => User, { onDelete: 'CASCADE' })
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
}
