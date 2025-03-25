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
import { Book } from 'src/book/book.entity';
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

  async readAllUserBooks(): Promise<
    {
      title: string;
      description: string;
      image: string;
      author: string;
      rating: number;
      genre: string;
      id: number;
      bookid: number;
      publishedYear: number;
    }[]
  > {
    const books = await this.bookService.getBooks();
    console.log(books.length);

    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await this.reviewBooksRepository.find({
          where: { book: { id: book.id } },
        })
        ;
        let rating = 0;
        if (reviews.length > 0) {
          reviews.forEach((review) => {
            //console.log(rating, review.rating);
            rating += Number(review.rating);
          })
          //console.log("rating raw for book: ", book.title, rating);

          rating = Math.round(rating / reviews.length);
          //console.log("rating full for book: ", book.title, rating);

        }

        return {
          author: book.author,
          description: book.description ? book.description : '',
          genre: book.genre,
          image: book.coverImageUrl ? book.coverImageUrl : '',
          rating: rating ? Number(rating) : 0,
          title: book.title,
          id: book.id,
          bookid: book.id,
          coverURL: book.coverImageUrl ? book.coverImageUrl : '',
          publishedYear: book.publishedYear
        };
      }),
    );

    return booksWithRatings;
  }

  status;

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
          bookid: ub.book.id,
          published: ub.book.publishedYear,
        };
      }),
    );
    return {
      books,
      success: true,
    };
  }

  async reviewBook(
    token: string,
    bookId: number,
    rating: number,
    review: string,
  ) {
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
    const book = await this.userBooksRepository.findOne({
      where: { id: bookId },
      relations: ['book'],
    });
    if (!book) {
      return {
        success: false,
      };
    }
    const reviewEntity = new Review();
    reviewEntity.user = user;
    reviewEntity.book = book.book;
    reviewEntity.content = review;

    const validRatings: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
    if (validRatings.includes(rating as 1 | 2 | 3 | 4 | 5)) {
      reviewEntity.rating = rating as 1 | 2 | 3 | 4 | 5;
    } else {
      return {
        success: false,
      };
    }

    // Check if a review already exists for this user and book
    const existingReview = await this.reviewBooksRepository.findOne({
      where: {
        user: { id: user.id },
        book: { id: book.book.id },
      },
    });
    if (existingReview) {
      // Update existing review
      existingReview.content = reviewEntity.content;
      existingReview.rating = reviewEntity.rating;
      await this.reviewBooksRepository.save(existingReview);
    } else {
      // Save new review
      await this.reviewBooksRepository.save(reviewEntity);
    }
    return {
      success: true,
    };
  }

  async setStatus(token: string, bookId: number, status: number) {
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
      console.log('error decoding token');
      return {
        success: false,
      };
    }

    if (!decoded) {
      console.log('no decoded');
      return {
        success: false,
      };
    }

    const user = await this.readOneById(decoded.id);
    if (!user) {
      console.log("user not found", decoded.id);
      return {
        success: false,
      };
    }

    const book = await this.bookService.getBookById(bookId);
    if (!book) {
      console.log("book not found", bookId);
      return {
        success: false,
      };
    }

    let userBook = await this.userBooksRepository.findOne({
      where: { user: { id: user.id }, book: { id: book.id } },
    });

    if (!userBook) {
      if (status == 0) {
        return {
          success: true,
        };
      }
      const newUserBook = new UserBook();
      newUserBook.user = user;
      newUserBook.book = book;
      newUserBook.status =
        status == 1 ? 'wishlist' : status == 2 ? 'reading' : 'finished';
      userBook = await this.userBooksRepository.save(newUserBook);
    } 
    if (status == 0) {
      await this.userBooksRepository.delete({
        id: userBook.id,
      });
      return {
        success: true,
      };
    }

    userBook.status =
      status == 1 ? 'wishlist' : status == 2 ? 'reading' : 'finished';
    await this.userBooksRepository.save(userBook);
    return {
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

  async getReviewForBookByUserBookId(token: string, bookId: number) {
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
    const userBook = await this.userBooksRepository.findOne({
      where: { user: { id: user.id }, book: { id: bookId } },
    });
    if (!userBook) {
      return {
        success: true,
        review: '',
      };
    }
    const review = await this.getReviewByUserAndBook(user.id, bookId);
    if (!review) {
      return {
        success: true,
        review: '',
      };
    }
    return {
      success: true,
      review: review.content ? review.content : '',
    };
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
      console.log('book not found', bookId);
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
  bookid: number;
  state: 'wishlist' | 'reading' | 'finished';
}
