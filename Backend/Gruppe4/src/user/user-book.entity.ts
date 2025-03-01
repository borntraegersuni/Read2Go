import { Book } from 'src/book/book.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from './user.entity';

@Entity()
export class UserBook extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  book: Book;

  @Column({
    type: 'text',
    enum: ['wishlist', 'reading', 'finished'],
  })
  status: 'wishlist' | 'reading' | 'finished';

  @Column({ nullable: true })
  currentPage?: number;

  @Column({ nullable: true })
  totalPages?: number;
}
