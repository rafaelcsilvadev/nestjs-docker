import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entitiy';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  // Relacionamento com Posts que já criamos
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  // 1. Quem este usuário está SEGUINDO
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'user_follows', // Nome da tabela intermediária no Postgres
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  following: User[];

  // 2. Quem este usuário segue
  @ManyToMany(() => User, (user) => user.following)
  followers: User[];
}
