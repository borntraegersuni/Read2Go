import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Review } from 'src/review/review.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Review, { nullable: true, onDelete: 'CASCADE' })
  review?: Review;

  @Column()
  content: string;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];
}
