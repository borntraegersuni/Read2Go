import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(email, password) {
    //Find user by email from database
    const retrivedUser = await this.userService.readOneByEmail(email);

    //Check if user exists
    if (!retrivedUser) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    //Check if password is correct
    if (
      !retrivedUser.passwordHash ||
      !(await argon2.verify(retrivedUser.passwordHash, password))
    ) {
      return {
        message: 'Password incorrect',
        success: false,
      };
    }
    const token = jwt.sign(
      { id: retrivedUser.id, email: retrivedUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );
    return {
      message: 'Login successful',
      success: true,
      user: retrivedUser,
      token,
    };
  }
  async signup(email, password, username) {
    //Check if user already exists
    const retrivedUser = await this.userService.readOneByEmail(email);
    const retrivedUserUsername =
      await this.userService.readOneByUsername(username);

    if (retrivedUser) {
      return {
        message: 'Email already exists',
        success: false,
      };
    }

    if (retrivedUserUsername) {
      return {
        message: 'Username already exists',
        success: false,
      };
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.passwordHash = await argon2.hash(password);
    const { id } = await this.userService.create(user);
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return {
      message: 'Signup successful',
      success: true,
      user,
      token,
    };
  }
  async deleteUser(token: string, password: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      iat: number;
      exp: number;
    };
    const user = await this.userService.readOne(decoded.id);
    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }
    if(!(await argon2.verify(user.passwordHash, password))) {
      return {
        message: 'Password incorrect',
        success: false,
      };
    }
    
    await this.userService.delete(user.id);
    return {
      message: 'User deleted',
      success: true,
    };
  }
  async updateUser(token: string, oldpassword: string, newpassword: string, username: string, email: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      iat: number;
      exp: number;
    };
    const user = await this.userService.readOne(decoded.id);
    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }
    if (!(await argon2.verify(user.passwordHash, oldpassword))) {
      return {
        message: 'Password incorrect',
        success: false,
      };
    }
    if (!email.includes('@') || !email.includes('.')) {
      return {
        message: 'Email is invalid',
        success: false,
      };
    }
    const existingUserByEmail = await this.userService.readOneByEmail(email);
    if (existingUserByEmail && existingUserByEmail.id !== user.id) {
      return {
        message: 'Email already taken',
        success: false,
      };
    }

    const existingUserByUsername = await this.userService.readOneByUsername(username);
    if (existingUserByUsername && existingUserByUsername.id !== user.id) {
      return {
        message: 'Username already taken',
        success: false,
      };
    }
    const newuser = new User();
    newuser.username = username;
    newuser.email = email;
    if(newpassword && newpassword != '')
      newuser.passwordHash = await argon2.hash(newpassword);
    await this.userService.update(user.id, newuser);
    return {
      message: 'User updated',
      success: true,
    }
  }
}
