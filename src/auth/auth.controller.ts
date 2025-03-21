import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Request,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { Public } from './decorators/public.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { GetUser } from '@/common/decorators/user.decorator'
import { User } from '@/users'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  private getCookieOptions(): CookieOptions {
    const isProduction = this.configService.get('NODE_ENV') === 'production'

    return {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: isProduction ? '.teresuelvo.com.co' : undefined,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day,
      partitioned: true, // Add this for Safari 17+ (Privacy Preserving Ad Attribution)
    } as CookieOptions // Type assertion to handle 'partitioned'
  }

  @Public()
  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token } = await this.authService.signup(createUserDto)
    response.cookie('jwt', access_token, this.getCookieOptions())
    return { message: 'Successfully signed up' }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token } = await this.authService.login(req.user)
    response.cookie('jwt', access_token, this.getCookieOptions())
    return { message: 'Successfully logged in', isAdmin: req.user.isAdmin }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', this.getCookieOptions())
    return { message: 'Successfully logged out' }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  @Public()
  @Get('validate')
  async validateUserData(
    @Query('documentNumber') documentNumber?: string,
    @Query('email') email?: string
  ) {
    if (!documentNumber && !email) {
      throw new BadRequestException('Email or document number is required')
    }

    const isAvailable = await this.authService.validateUserData(
      documentNumber,
      email
    )
    if (!isAvailable) {
      throw new BadRequestException('User already exists')
    }
    return { isAvailable }
  }
}
