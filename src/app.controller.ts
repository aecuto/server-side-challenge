import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PasswordDto, RegisterDto } from 'src/app.dto';
import * as argon2 from 'argon2';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller()
export class AppController {
  private users: RegisterDto;

  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    this.users = payload;

    const hash = await argon2.hash(payload.password);

    return { ...this.users, password: hash };
  }

  @Get('/profile')
  @ApiBearerAuth()
  profile(@Headers('authorization') authHeader: string) {
    this.auth(authHeader);

    return this.users;
  }

  @Put('/profile')
  @ApiBearerAuth()
  edit(
    @Body() payload: RegisterDto,
    @Headers('authorization') authHeader: string,
  ) {
    this.auth(authHeader);

    this.users = { ...this.users, ...payload };
    return this.users;
  }

  @Patch('/password-change')
  @ApiBearerAuth()
  async change(
    @Body() payload: PasswordDto,
    @Headers('authorization') authHeader: string,
  ) {
    this.auth(authHeader);

    const hash = await argon2.hash(payload.password);

    this.users = { ...this.users, password: hash };
    return this.users;
  }

  private auth(token: string) {
    if (token !== 'Bearer faketoken_user1') {
      throw new UnauthorizedException();
    }
  }
}
