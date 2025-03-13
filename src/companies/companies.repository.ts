import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'
import { Company } from './company.entity'

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private repository: Repository<Company>
  ) {}

  create(data: Partial<Company>) {
    console.log('data', data)

    const company = this.repository.create({
      ...data,
      user: { id: data.user?.id },
    })
    return this.repository.save(company)
  }

  save(company: Company) {
    return this.repository.save(company)
  }

  findOne(query: FindOptionsWhere<Company> | FindOptionsWhere<Company>[]) {
    return this.repository.findOne({ where: query })
  }

  findByDocumentNumber(documentNumber: string) {
    return this.findOne({ documentNumber })
  }
}
