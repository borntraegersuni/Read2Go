import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserBook } from './user-book.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BookModule, TypeOrmModule.forFeature([User, UserBook])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
