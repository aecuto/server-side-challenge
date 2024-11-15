import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  date_of_birth: Date;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsBoolean()
  subscribe_to_newsletter: boolean;
}

export class PasswordDto {
  @ApiProperty()
  @IsString()
  password: string;
}
