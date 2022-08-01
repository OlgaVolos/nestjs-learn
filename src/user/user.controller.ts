import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard) // лише авторизовані користувачі сюди пеейдуть
  findAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard) // лише авторизовані користувачі сюди пеейдуть
  findOne(@Param('id') id: string) {
    return this.userService.getOneUser(id);
    // findOne(@Request @Param('id') id: string) // можна ловити юзера
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
