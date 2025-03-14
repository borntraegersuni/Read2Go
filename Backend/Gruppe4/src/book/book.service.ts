import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async addBook(
    book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    return await this.booksRepository.save(book);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async getBooks(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async getBookById(id: number): Promise<Book | null> {
    const result = await this.booksRepository.find({
      where: { id },
      relations: {},
    });
    return result ? result[0] : null;
  }

  async updateBook(bookId: number, bookData: Partial<Book>) {
    return await this.booksRepository.update(bookId, bookData);
  }

  async deleteBook(bookId: number): Promise<void> {
    await this.booksRepository.delete(bookId);
  }
  
  

}