import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('books')
  async getBooks(@Headers() headers, @Res() res: Response) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const returnV = await this.userService.getBooks(headers.authorization);
    if (returnV.success === false) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
      });
    }
    return res.status(200).json({
      books: returnV.books,
      success: true,
    });
  }
  @Post('rating')
  async rateBook(
    @Headers() headers,
    @Query('book') bookId: string,
    @Query('rating') rating: string,
    @Res() res: Response,
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const returnV = await this.userService.rateBook(
      headers.authorization,
      bookId,
      rating,
    );
    if (returnV.success === false) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Book rated successfully',
      success: true,
    });
  }

  @Post('review')
  async reviewBook(
    @Headers() headers,
    @Body() body: { bookId: number; review: string; rating: number },
    @Res() res: Response,
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const returnV = await this.userService.reviewBook(
      headers.authorization,
      body.bookId,
      body.rating,
      body.review,
    );
    if (returnV.success === false) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Book reviewed successfully',
      success: true,
    });
  }
  @Get('review')
  async getReviewByUserBookId(
    @Headers() headers,
    @Query('bookId') bookId: number,
    @Res() res: Response,
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const returnV = await this.userService.getReviewForBookByUserBookId(
      headers.authorization,
      bookId,
    );
    if (returnV.success === false) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
      });
    }
    return res.status(200).json({
      review: returnV.review,
      success: true,
    });
  }

  @Post('status')
  async setStatus(
    @Headers() headers,
    @Body() body: { bookId: number; status: number },
    @Res() res: Response,
  ) {
    if (!headers.authorization) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No authorization header found', success: false });
      return;
    }
    const returnV = await this.userService.setStatus(
      headers.authorization,
      body.bookId,
      body.status,
    );
    if (returnV.success === false) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
      });
    }
    return res.status(200).json({
      message: 'Status saved successfully',
      success: true,
    });
  }
  @Get('allBooks')
  async getAllBooks(@Res() res: Response) {
    const returnV = await this.userService.readAllUserBooks();
    return res.status(200).json({
      books: returnV,
      success: true,
    });
  }

}
