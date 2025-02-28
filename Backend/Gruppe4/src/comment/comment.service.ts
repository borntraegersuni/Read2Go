import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ReviewService } from 'src/review/review.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
  ) {}

  async addComment(
    userId: number,
    content: string,
    reviewId?: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = content;

    const user = await this.userService.readOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    comment.user = user;

    if (reviewId) {
      const review = await this.reviewService.getReview(reviewId);
      if (!review) {
        throw new NotFoundException(`review with id ${reviewId} not found`);
      }
      comment.review = review;
    }

    return await this.commentsRepository.save(comment);
  }

  async getCommentsForReview(reviewId: number): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { review: { id: reviewId } },
    });
  }

  // todo: check if delete is allowed in controller
  async deleteComment(commentId: number): Promise<void> {
    await this.commentsRepository.delete(commentId);
  }

  async addLike(commentId: number, userId: number) {
    const user = await this.userService.readOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: { likes: true },
    });
    if (!comment) {
      throw new NotFoundException(`comment with id ${commentId} not found`);
    }

    comment.likes.push(user);
    await this.commentsRepository.save(comment);
  }

  async removeLike(commentId: number, userId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: { likes: true },
    });
    if (!comment) {
      throw new NotFoundException(`comment with id ${commentId} not found`);
    }

    const idx = comment.likes.findIndex((user) => user.id === userId);
    if (idx >= 0) {
      comment.likes.splice(idx, 1);
    }
    await this.commentsRepository.save(comment);
  }
}
