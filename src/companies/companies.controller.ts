import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { GetUser } from '../common/decorators/user.decorator'
import { User } from '../users/user.entity'
import { Public } from '@/auth/decorators/public.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Public()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@GetUser() user: User, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto, user)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companiesService.findOne(id)
  // }
  @Public()
  @Get('verify')
  async validateCompanyData(@Query('documentNumber') documentNumber?: string) {
    if (!documentNumber) {
      throw new BadRequestException('Document number is required')
    }

    const isAvailable =
      await this.companiesService.validateCompanyData(documentNumber)

    if (!isAvailable) {
      throw new BadRequestException('Company already exists')
    }
    return { isAvailable }
  }
}
