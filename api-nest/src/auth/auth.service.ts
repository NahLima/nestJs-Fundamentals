import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "@prisma/client";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { access } from "fs";


@Injectable()
export class AuthService{
    private readonly issuer = 'login';
    private readonly audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma:PrismaService,
        private readonly userService: UserService
    ) {}
    

    async createToken(user:Users){
        return {
        accessToken: 
            this.jwtService.sign({
            id: user.id,
            name: user.name,
            email:user.email

        },
        {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: this.issuer,
            audience: this.audience
        })};

    }

    checkToken(token:string){

        try {
            const data =  this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            })
            return data

        }catch (e){
            throw new BadRequestException(e)
        }

    }

    async login(email:string, password:string){
        const user = await this.prisma.users.findFirst({
            where: {
                email,
                password
            }
        })

        if (!user){
            throw new UnauthorizedException('E-mail ou senha incorretos');
        }

        return this.createToken(user)
    }

    async forget(email:string){
        const user = await this.prisma.users.findFirst({
            where: {
                email
            }
        })

        if (!user){
            throw new UnauthorizedException('E-mail invalido');
        }

        return true
    }

    async reset(password:string, token:string){
        
        //TO DO : validar token
        const id = 0;

        const user = await this.prisma.users.update({
            where:{
                id
            },
            data: {
                password,
            }
        })
        return this.createToken(user)
    }

    async register(data:AuthRegisterDTO){
        const user = await this.userService.create(data);
        return this.createToken(user)
    }


    isValidToken(token:string){
        try {
            this.checkToken(token);
            return true;
        }catch (e) {
            return false;
        }
            
        
    }
}

