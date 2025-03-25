import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserBook } from './user-book.entity';
import { BookModule } from 'src/book/book.module';
import { ReviewModule } from 'src/review/review.module';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/review.entity';
@Module({
  imports: [
    BookModule,
    TypeOrmModule.forFeature([User, UserBook, Review]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
