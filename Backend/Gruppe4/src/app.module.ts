import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { CommentService } from './comment/comment.service';
import { ReviewModule } from './review/review.module';
import { ReviewService } from './review/review.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    UserModule,
    BookModule,
    CommentModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    private readonly reviewService: ReviewService,
    private readonly commentService: CommentService,
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"

    const { id: userId } = await this.userService.create(user);
    const { id: bookId } = await this.bookService.addBook({
      title: 'title',
      author: 'author',
      publishedYear: 2000,
      isbn: 'isbn',
      genre: 'genre',
    });
    await this.userService.addBookToUser(userId, bookId, 'wishlist');
    const { id: reviewId } = await this.reviewService.addReview(
      userId,
      bookId,
      2,
      'content review',
    );
    await this.reviewService.addLike(reviewId, userId);
    const { id: commentId } = await this.commentService.addComment(
      userId,
      'ok',
    );
    await this.commentService.addLike(commentId, userId);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const bookRead = await this.bookService.getBookById(bookId);
    console.log(inspect(bookRead, true, 10, true));

    const commentRead =
      await this.commentService.getCommentsForReview(reviewId);
    console.log(inspect(commentRead, true, 10, true));

    const reviewRead = await this.reviewService.getReview(reviewId);
    console.log(inspect(reviewRead, true, 10, true));
  }
}
