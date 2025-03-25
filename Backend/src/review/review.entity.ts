import { Book } from 'src/book/book.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';

@Entity()
export class Review extends BaseEntity {
  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  book: Book;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'numeric', enum: [1, 2, 3, 4, 5] })
  rating: 1 | 2 | 3 | 4 | 5;

  @Column({ nullable: true })
  content?: string;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
