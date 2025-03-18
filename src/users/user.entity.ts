import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  lastName: string

  @Column({ type: 'enum', enum: ['CC', 'CE', 'PASSPORT'] })
  documentType: 'CC' | 'CE' | 'PASSPORT'

  @Column({ unique: true })
  documentNumber: string

  @Column()
  phoneCode: string

  @Column()
  phoneNumber: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ type: 'boolean', default: false, name: 'isAdmin' })
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date
}
