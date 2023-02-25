import { Body, Controller, Post, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) { }

    @Post("/register")
    async register(@Body() userDto: UserDto): Promise<User> {
        return await this.userService.createUser({ ...userDto })
    }

    @Post("/login")
    async login(@Body() userDto: UserDto): Promise<User> {
        return await this.userService.validateUser(userDto);
    }
}
