import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOneUser(userId: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });
  }

  getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email: userEmail },
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
        status: data.status,
      },
    });
  }

  deleteUser(userId: string): Promise<User> {
    return this.prismaService.user.delete({
      where: { id: Number(userId) },
    });
  }
}
