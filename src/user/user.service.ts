import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOneUser(userId: string): Promise<User> {
    // Number(id) -> convert string in number
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
      // select: {
      //   email: true,
      //   userName: true,
      // },
      // include: { posts: true },
    });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        userName: data.userName,
        age: data.age,
      },
    });
  }

  deleteUser(userId: string): Promise<User> {
    return this.prismaService.user.delete({
      where: { id: Number(userId) },
    });
  }
}
