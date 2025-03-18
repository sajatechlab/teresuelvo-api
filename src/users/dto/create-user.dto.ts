import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  lastName: string

  @IsEnum(['CC', 'CE', 'PASSPORT'])
  documentType: 'CC' | 'CE' | 'PASSPORT'

  @IsString()
  documentNumber: string

  @IsString()
  phoneCode: string

  @IsString()
  phoneNumber: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsBoolean()
  isAdmin: boolean
}
