import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserBook } from './user-book.entity';
import { BookService } from 'src/book/book.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserBook)
    private userBooksRepository: Repository<UserBook>,
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

  async readOneByUsername(username: string): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { username },
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

  async addBookToUser(
    id: number,
    bookId: number,
    status: 'wishlist' | 'reading' | 'finished',
  ): Promise<UserBook> {
    const user = await this.readOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found.`);
    }
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException(`book with id ${id} not found.`);
    }

    const userBook = new UserBook();
    userBook.book = book;
    userBook.user = user;
    userBook.status = status;

    return await this.userBooksRepository.save(userBook);
  }

  async updateReadingProgress(
    userId: number,
    bookId: number,
    currentPage: number,
  ): Promise<UserBook | null> {
    const userBook = await this.userBooksRepository.findOne({
      where: { user: { id: userId }, book: { id: bookId } },
    });
    if (userBook) {
      userBook.currentPage = currentPage;
    }
    return userBook;
  }

  async getUserBooks(userId: number): Promise<UserBook[]> {
    const userBooks = await this.userBooksRepository.find({
      where: { user: { id: userId } },
    });
    return userBooks;
  }
}
