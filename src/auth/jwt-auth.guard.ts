import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization; // дістаємо з хедерів токен
    const bearer = authHeaders.split(' ')[0]; // відділиться Bearer
    const token = authHeaders.split(' ')[1]; // відділиться токен

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not auth' });
    }

    const user = this.jwtService.verify(token, {
      publicKey: 'secret',
    });
    request.user = user;
    return true;
  }
}

// це типу мідлвари
// можна використовувати try-catch і ловити помилки
