import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

}
