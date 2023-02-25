import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    // 선택 onModuleInit사항이다, 생략하면 Prisma는 데이터베이스에 대한 첫 번째 호출에서 느리게 연결한다. 
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutDownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
}
