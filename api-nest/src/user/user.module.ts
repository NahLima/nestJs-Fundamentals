import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdMiddleware } from "src/middlewares/user-id-check.middleware";

@Module({
    imports:[PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserModule]
})
export class UserModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}
