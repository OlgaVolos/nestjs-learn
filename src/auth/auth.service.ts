import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { RegistrationUserDtoTs } from './dto/registration-user.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(authUser: LoginUserDto) {
    const user = await this.validateUser(authUser);
    return this.generateToken(user);
  }

  async registration(registerUser: RegistrationUserDtoTs) {
    const findUser = await this.userService.getUserByEmail(registerUser.email);
    if (findUser) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(registerUser.password, 7);
    const user = await this.userService.createUser({
      ...registerUser,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async validateUser(user: LoginUserDto) {
    const userDb = await this.userService.getUserByEmail(user.email);
    const passEqual = await bcrypt.compare(user.password, user.email);
    if (userDb && passEqual) {
      return userDb;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, name: user.userName, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
