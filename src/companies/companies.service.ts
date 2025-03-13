import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { User } from '../users/user.entity'
import { CompaniesRepository } from './companies.repository'

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async create(createCompanyDto: CreateCompanyDto, user: User) {
    console.log('createCompanyDto', user)

    try {
      // Check if company exists
      const existingCompany =
        await this.companiesRepository.findByDocumentNumber(
          createCompanyDto.documentNumber
        )

      if (existingCompany) {
        throw new ConflictException(
          'Company with this document number already exists'
        )
      }

      return this.companiesRepository.create({
        ...createCompanyDto,
        user,
      })
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error creating company')
    }
  }

  findOne(id: string) {
    return this.companiesRepository.findOne({ id })
  }

  findByDocumentNumber(documentNumber: string) {
    return this.companiesRepository.findByDocumentNumber(documentNumber)
  }

  async validateCompanyData(documentNumber?: string): Promise<boolean> {
    const query = []

    if (documentNumber) {
      query.push({ documentNumber })
    }
    const existingCompany = await this.companiesRepository.findOne(query)

    return !existingCompany
  }
}
