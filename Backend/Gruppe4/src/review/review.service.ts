import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    //private readonly bookService: BookService,
  ) {}

  async getReview(reviewId: number): Promise<Review | null> {
    return await this.reviewsRepository.findOne({
      where: { id: reviewId },
      relations: { user: true, book: true, likes: true },
    });
  }

  async getReviewByUserAndBook(userId: number, bookId: number): Promise<Review | null> {
    return await this.reviewsRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
      relations: { user: true, book: true, likes: true },
    });
  }

  // async addReview(
  //   userId: number,
  //   bookId: number,
  //   rating: 1 | 2 | 3 | 4 | 5,
  //   content?: string,
  // ): Promise<Review> {
  //   const user = await this.userService.readOne(userId);
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   const book = await this.bookService.getBookById(bookId);
  //   if (!book) {
  //     throw new NotFoundException(`book with id ${bookId} not found`);
  //   }
  //   const review = new Review();
  //   review.user = user;
  //   review.book = book;
  //   review.rating = rating;
  //   review.content = content;

  //   return await this.reviewsRepository.save(review);
  // }

  // async getReviewsForBook(bookId: number): Promise<Review[]> {
  //   return await this.reviewsRepository.find({
  //     where: { book: { id: bookId } },
  //     relations: { user: true, likes: true },
  //   });
  // }

  // // todo: Check if user is allowed to delete review in controller
  // async deleteReview(reviewId: number): Promise<void> {
  //   await this.reviewsRepository.delete(reviewId);
  // }

  // async addLike(reviewId: number, userId: number) {
  //   const user = await this.userService.readOne(userId);
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   const review = await this.reviewsRepository.findOne({
  //     where: { id: reviewId },
  //     relations: { likes: true },
  //   });
  //   if (!review) {
  //     throw new NotFoundException(`review with id ${reviewId} not found`);
  //   }

  //   review.likes.push(user);
  //   await this.reviewsRepository.save(review);
  // }

  // async removeLike(reviewId: number, userId: number) {
  //   const review = await this.reviewsRepository.findOne({
  //     where: { id: reviewId },
  //     relations: { likes: true },
  //   });
  //   if (!review) {
  //     throw new NotFoundException(`review with id ${reviewId} not found`);
  //   }

  //   const idx = review.likes.findIndex((user) => user.id === userId);
  //   if (idx >= 0) {
  //     review.likes.splice(idx, 1);
  //   }
  //   await this.reviewsRepository.save(review);
  // }
}
