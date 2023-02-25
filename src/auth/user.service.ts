import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt"


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User | undefined> {
        let dbUser = await this.findUserByName({ name: data.name })

        if (dbUser) {
            throw new HttpException(`${dbUser.name}은 이미 사용중입니다.`, HttpStatus.BAD_REQUEST)
        }

        await this.transformPassword(data)

        return this.prisma.user.create({
            data
        })
    }

    async transformPassword(user: Prisma.UserCreateInput): Promise<void> {
        user.password = await bcrypt.hash(user.password, 10)
        return Promise.resolve();
    }

    async findUserByName(userName: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: userName
        })
    }

    async validateUser(user: UserDto): Promise<User | undefined> {
        let foundUser = await this.findUserByName({ name: user.name });

        const validateCheck = await bcrypt.compare(user.password, foundUser.password)

        // 이름에 해당하는 유저가 없거나 패스워드가 다르면 인증실패
        if (!foundUser || !validateCheck) {
            throw new UnauthorizedException();
        }

        return foundUser;
    }
}