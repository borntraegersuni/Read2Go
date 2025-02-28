import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { UserBook } from './user-book.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  // Use cascade: true to automatically create the userBook in the userBooks-table
  @OneToMany(() => UserBook, (userBook) => userBook.user, { cascade: true })
  userBooks: UserBook[];
}
