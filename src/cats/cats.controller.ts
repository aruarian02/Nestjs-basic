import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './CreateCatDto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {

    // private을 사용하면 선언과 초기화가 동시에 이루어진다.
    constructor(private catsService: CatsService) { }

    @Get()
    findAll(): Cat[] {
        return this.catsService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string): string {
        return `This action returns a #${id} cat`
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() createCatDto: CreateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return `This action remove a #${id} cat`
    }
}
