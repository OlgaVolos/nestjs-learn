import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users') // як роутер
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    @Get() // підрозумівається, що тут '/'
    getAllUsers(){
        return this.userService.getAll();
    }

    @Get('/:id')
        getOneUser(@Param() param : any) {
        const {id} = param;
        return this.userService.getUserById(id); // може бути такий варіант
    }
    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }
    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string,
               @Body() user: UpdateUserDto) {
        return this.userService.updateUser(id, user)
    }
}
