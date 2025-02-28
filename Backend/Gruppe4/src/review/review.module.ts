import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { UserModule } from '../user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [UserModule, BookModule, TypeOrmModule.forFeature([Review])],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
