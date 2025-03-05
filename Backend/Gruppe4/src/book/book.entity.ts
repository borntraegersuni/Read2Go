import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  publishedYear: number;

  @Column()
  genre: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  coverImageUrl?: string;
}
