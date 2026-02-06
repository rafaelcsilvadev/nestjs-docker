import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm'; // Importação direta do TypeORM
import { User } from '../../entities/user.entity';
import { Post } from '../../entities/post.entitiy';
import { CreateUserDto } from '../../dtos/create_user.dto';
import { CreatePostDto } from '../../dtos/create_post.dto';

@Injectable()
export class UserService {
  constructor(
    // Injeta o manager que gerencia a conexão definida no AppModule
    private readonly entityManager: EntityManager,
  ) {}

  // 1. Criar Usuário
  async createUser(dto: CreateUserDto) {
    const newUser = this.entityManager.create(User, dto);
    return await this.entityManager.save(newUser);
  }

  // 2. Criar Post
  async createPost(dto: CreatePostDto) {
    const { authorId, ...postData } = dto;

    // Busca o usuário usando o manager genérico
    const user = await this.entityManager.findOneBy(User, { id: authorId });

    if (!user) throw new NotFoundException('Autor não encontrado');

    const newPost = this.entityManager.create(Post, {
      ...postData,
      author: user,
    });

    return await this.entityManager.save(newPost);
  }

  // 3. GetProfile
  async getUserProfile(userId: number) {
    const user = await this.entityManager.findOne(User, {
      where: { id: userId },
      relations: {
        posts: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário ${userId} não encontrado`);
    }

    return user;
  }
}
