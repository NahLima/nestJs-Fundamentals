import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";


@Module({
    imports: [
        JwtModule.register({
            secret: `?|joUeVUy#fpM]C)N{kcmyG$MN3*(S=%`
    }),
    UserModule,
    PrismaModule
    ],
    controllers:[AuthController],
    providers: [AuthService, PrismaModule, UserService]
})

export class AuthModule{}