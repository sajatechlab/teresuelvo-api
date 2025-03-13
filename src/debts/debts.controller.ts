import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common'
import { DebtsService } from './debts.service'
import { CreateDebtDto } from './dto/create-debt.dto'
import { UpdateDebtDto } from './dto/update-debt.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { User } from '@/users'
import { GetUser } from '@/common/decorators/user.decorator'

@Controller('debts')
@UseGuards(JwtAuthGuard)
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@Body() createDebtDto: CreateDebtDto, @GetUser() user: User) {
    return this.debtsService.create(createDebtDto, user)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.debtsService.findOne(id)
  // }

  @Get()
  findAll(@GetUser() user: User) {
    return this.debtsService.findAllByUser(user.id)
  }

  @Get('not-negotiated')
  findAllNotNegotiated(@GetUser() user: User) {
    return this.debtsService.findAllNotNegotiated(user.id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.update(id, updateDebtDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.debtsService.delete(id)
  }
}
