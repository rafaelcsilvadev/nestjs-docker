import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserController],
  providers: [UserService],
})
export class FeatureModule {}
