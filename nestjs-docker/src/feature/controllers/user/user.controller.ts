import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importações do Swagger
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dtos/create_user.dto';
import { CreatePostDto } from '../../dtos/create_post.dto';

@ApiTags('users') // Agrupa as rotas de usuários na interface do Swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('posts')
  @ApiOperation({ summary: 'Criar um post para um usuário' })
  @ApiResponse({ status: 201, description: 'Post criado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado.' })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.userService.createPost(createPostDto);
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Obter perfil completo do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 200, description: 'Perfil retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserProfile(id);
  }
}
