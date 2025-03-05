import {
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';

interface loginBody {
  email: string;
  password: string;
}

interface signupBody {
  email: string;
  password: string;
  username: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() body: loginBody,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    res
      .status(result.success ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
      .json(result);
  }
  @Post('signup')
  async signup(
    @Body() body: signupBody,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password, username } = body;
    const result = await this.authService.signup(email, password, username);
    res
      .status(result.success ? HttpStatus.CREATED : HttpStatus.CONFLICT)
      .json(result);
  }
  @Delete('delete')
  async delete(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: { password: string },
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const { password } = body;
    const result = await this.authService.deleteUser(
      headers.authorization,
      password,
    );
    res
      .status(result.success ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
      .json(result);
  }
  @Patch('update')
  async update(
    @Headers() headers,
    @Res() res: Response,
    @Body()
    body: {
      username: string;
      email: string;
      oldpassword: string;
      newpassword: string;
    },
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const { username, email, oldpassword, newpassword } = body;
    const result = await this.authService.updateUser(
      headers.authorization,
      oldpassword,
      newpassword,
      username,
      email,
    );
    res
      .status(result.success ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
      .json(result);
  }
}
