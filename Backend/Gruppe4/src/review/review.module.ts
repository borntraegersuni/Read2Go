import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { UserModule } from '../user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    BookModule,
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService], // Ensure ReviewService is exported
})
export class ReviewModule {}
