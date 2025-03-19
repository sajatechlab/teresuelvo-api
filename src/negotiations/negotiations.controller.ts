import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { NegotiationsService } from './negotiations.service'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { UpdateNegotiationDto } from './dto/update-negotiation.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { GetUser } from '@/common/decorators/user.decorator'
import { User } from '@/users'
import { NegotiationStatus } from './enum/status.enum'
@Controller('negotiations')
@UseGuards(JwtAuthGuard)
export class NegotiationsController {
  constructor(private readonly negotiationsService: NegotiationsService) {}

  @Post()
  create(@Body('debtId') debtId: string) {
    return this.negotiationsService.create(debtId)
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updatedNegotiationDto: UpdateNegotiationDto
  ) {
    return this.negotiationsService.updateStatus(id, updatedNegotiationDto)
  }

  @Get('by-user')
  findAllByUser(@GetUser() user: User) {
    return this.negotiationsService.findAllByUser(user.id)
  }

  @Get('by-admin')
  findAllByAdmin() {
    return this.negotiationsService.findAllByAdmin()
  }

  @Get('metrics')
  getNegotiationMetrics(@GetUser() user: User) {
    return this.negotiationsService.getNegotiationMetrics(user.id)
  }
}
