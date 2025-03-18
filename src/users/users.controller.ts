import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { GetUser } from '@/common/decorators/user.decorator'
import { User } from '../users/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Get('dashboard-metrics')
  @UseGuards(JwtAuthGuard)
  async getDashboardMetrics(@GetUser() user: User) {
    return this.usersService.getDashboardMetrics(user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.usersService.getUsers()
  }
}
