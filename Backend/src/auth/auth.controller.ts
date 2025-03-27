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
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface loginBody {
  email: string;
  password: string;
}

interface signupBody {
  email: string;
  password: string;
  username: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'your-password',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'your-password',
        username: 'your-username',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Signup successful' })
  @ApiResponse({ status: 409, description: 'Conflict: Email or username already exists' })
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
  @ApiBearerAuth()
  @ApiBody({ schema: { example: { password: 'your-password' } } })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(
    @Headers() headers,
    @Res() res: Response,
    @Body() body: { password: string },
  ) {
    const result = await this.authService.deleteUser(
      headers.authorization,
      body.password,
    );
    res
      .status(result.success ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
      .json(result);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      example: {
        username: 'new-username',
        email: 'new-email@example.com',
        oldpassword: 'old-password',
        newpassword: 'new-password',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
    const result = await this.authService.updateUser(
      headers.authorization,
      body.oldpassword,
      body.newpassword,
      body.username,
      body.email,
    );
    res
      .status(result.success ? HttpStatus.OK : HttpStatus.UNAUTHORIZED)
      .json(result);
  }
}
