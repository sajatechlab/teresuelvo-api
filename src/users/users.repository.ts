import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
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

  findAll() {
    return this.repository.find()
  }

  findByEmail(email: string) {
    return this.findOne({ email })
  }

  findByDocumentNumber(documentNumber: string) {
    return this.findOne({ documentNumber })
  }

  update(id: string, data: UpdateUserDto) {
    return this.repository.update(id, data)
  }

  softDelete(id: string) {
    return this.repository.softDelete(id)
  }
}
