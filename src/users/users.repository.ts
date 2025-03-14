import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  create(data: CreateUserDto) {
    return this.repository.create(data)
  }

  save(user: User) {
    return this.repository.save(user)
  }

  findOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.repository.findOne({ where: query })
  }

  findByEmail(email: string) {
    return this.findOne({ email })
  }

  findByDocumentNumber(documentNumber: string) {
    return this.findOne({ documentNumber })
  }
}
