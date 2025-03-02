import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserBook } from './user-book.entity';
import { BookService } from 'src/book/book.service';
import * as jwt from 'jsonwebtoken';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/review.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserBook)
    private userBooksRepository: Repository<UserBook>,
    @InjectRepository(Review)
    private reviewBooksRepository: Repository<Review>,
    private readonly bookService: BookService,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: { userBooks: { book: true } },
    });
    return result ? result[0] : null;
  }

  async deleteAll(): Promise<void> {
    await this.usersRepository.delete({});
  }

  async readOneByEmail(email: string): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { email },
      relations: { userBooks: { book: true } },
    });
    return result ? result[0] : null;
  }

  async readOneByUsername(username: string): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { username },
      relations: { userBooks: { book: true } },
    });
    return result ? result[0] : null;
  }

  async readOneById(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: { userBooks: { book: true } },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<User>) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // methods for user-books

  async getBooks(
    authtoken: string,
  ): Promise<{ success: boolean; books: IBook[] }> {
    let decoded: {
      id: number;
      email: string;
      iat: number;
      exp: number;
    } | null = null;
    try {
      decoded = jwt.verify(authtoken, process.env.JWT_SECRET!) as {
        id: number;
        email: string;
        iat: number;
        exp: number;
      };
    } catch {
      return {
        books: [],
        success: false,
      };
    }

    if (!decoded) {
      return {
        books: [],
        success: false,
      };
    }

    const user = await this.readOneById(decoded.id);
    if (!user) {
      return {
        books: [],
        success: false,
      };
    }

    const books = await Promise.all(
      user.userBooks.map(async (ub) => {
        const review = await this.getReviewByUserAndBook(user.id, ub.book.id);
        return {
          state: ub.status,
          author: ub.book.author,
          description: ub.book.description ? ub.book.description : '',
          genre: ub.book.genre,
          image: ub.book.coverImageUrl ? ub.book.coverImageUrl : '',
          rating: review ? Number(review.rating) : 0,
          title: ub.book.title,
          id: ub.id,
        };
      }),
    );
    return {
      books,
      success: true,
    };
  }

  async addBookToUser(
    userId: number,
    bookId: number,
    state: 'wishlist' | 'reading' | 'finished',
  ) {
    const user = await this.readOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const book = await this.bookService.getBookById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const userBook = new UserBook();
    userBook.user = user;
    userBook.book = book;
    userBook.status = state;
    await this.userBooksRepository.save(userBook);
  }

  async getReviewByUserAndBook(
    userId: number,
    bookId: number,
  ): Promise<Review | null> {
    return await this.reviewBooksRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
      relations: { user: true, book: true, likes: true },
    });
  }

  async rateBook(token: any, bookId: string, rating: string) {
    let decoded: {
      id: number;
      email: string;
      iat: number;
      exp: number;
    } | null = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        email: string;
        iat: number;
        exp: number;
      };
    } catch {
      return {
        success: false,
      };
    }

    if (!decoded) {
      return {
        success: false,
      };
    }

    const user = await this.readOneById(decoded.id);
    if (!user) {
      return {
        success: false,
      };
    }
    const book = await this.bookService.getBookById(Number(bookId));
    if (!book) {
      return {
        success: false,
      };
    }
    const review = new Review();
    review.user = user;
    review.book = book;
    const validRatings: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
    const numericRating = Number(rating);
    if (validRatings.includes(numericRating as 1 | 2 | 3 | 4 | 5)) {
      review.rating = numericRating as 1 | 2 | 3 | 4 | 5;
    } else {
      return {
        success: false,
      };
    }
    const existingReview = await this.reviewBooksRepository.findOne({
      where: {
        book: {
          id: book.id,
        },
        user: {
          id: user.id,
        },
      },
    });
    if (existingReview) {
      existingReview.rating = review.rating;
      await this.reviewBooksRepository.save(existingReview);
    } else {
      await this.reviewBooksRepository.save(review);
    }

    return {
      success: true,
    };
  }
}
export interface IBook {
  title: string;
  description: string;
  image: string;
  author: string;
  rating: number;
  genre: string;
  id: number;
  state: 'wishlist' | 'reading' | 'finished';
}
