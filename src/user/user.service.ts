import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    private users = []; // тут буде база

    getAll() {
        return this.users
    }

    getUserById(id: string) {
        // Number(id) -> конвертує ід в number
        return this.users.find((user) => user.id == id); // == бо цифрове ід не може === стрінзі
    }

    createUser(user: CreateUserDto) {
        this.users.push({
            ...user,
            id: new Date().valueOf(),
        });
        return user;
    }

    deleteUser(id: string) {
        const index = this.users.findIndex(user => user.id ==id);
        this.users.splice(index, 1)
    }

    updateUser(id: string, data: UpdateUserDto) {
        const index = this.users.findIndex(user => user.id == id);
        this.users[index] = {...this.users[index], ...data};
        return this.users[index];
    }
}
