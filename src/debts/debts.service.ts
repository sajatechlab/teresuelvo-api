import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateDebtDto } from './dto/create-debt.dto'
import { UpdateDebtDto } from './dto/update-debt.dto'
import { DebtsRepository } from './debts.repository'
import { User } from '@/users'
@Injectable()
export class DebtsService {
  constructor(private debtsRepository: DebtsRepository) {}

  async create(createDebtDto: CreateDebtDto, user: User) {
    const debt = this.debtsRepository.create({
      ...createDebtDto,
      user,
    })
    return this.debtsRepository.save(debt)
  }

  findOne(id: string) {
    return this.debtsRepository.findOne(id)
  }

  findByUser(userId: string) {
    return this.debtsRepository.findByUser(userId)
  }

  async findAllByUser(userId: string) {
    return this.debtsRepository.findByUser(userId)
  }

  async findAllByAdmin() {
    return this.debtsRepository.findAllByAdmin()
  }

  async findAllNotNegotiated(userId: string) {
    return this.debtsRepository.findAllNotNegotiated(userId)
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    const debt = await this.debtsRepository.findOne(id)
    if (!debt) {
      throw new NotFoundException('Debt not found')
    }
    return this.debtsRepository.update(id, updateDebtDto)
  }

  async delete(id: string) {
    const debt = await this.debtsRepository.findOne(id)
    if (!debt) {
      throw new NotFoundException('Debt not found')
    }
    return this.debtsRepository.delete(id)
  }
}
