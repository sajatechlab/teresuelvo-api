import { Injectable } from '@nestjs/common'
import { NegotiationsRepository } from './negotiations.repository'
import { UpdateNegotiationDto } from './dto/update-negotiation.dto'
@Injectable()
export class NegotiationsService {
  constructor(private negotiationsRepository: NegotiationsRepository) {}

  async create(debtId: string) {
    return this.negotiationsRepository.create(debtId)
  }

  findOne(id: string) {
    return this.negotiationsRepository.findOne(id)
  }

  findAllByUser(userId: string) {
    return this.negotiationsRepository.findAllByUser(userId)
  }

  findAllByAdmin() {
    return this.negotiationsRepository.findAllByAdmin()
  }

  getNegotiationMetrics(userId: string) {
    return this.negotiationsRepository.getNegotiationPageMetrics(userId)
  }

  updateStatus(id: string, updatedNegotiationDto: UpdateNegotiationDto) {
    return this.negotiationsRepository.updateStatus(id, updatedNegotiationDto)
  }
}
