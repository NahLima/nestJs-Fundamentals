import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    // async create({ name, email, password, birthAt }: CreateUserDTO) {

    //     const salt = await bcrypt.genSalt()
    //     console.log("salt: ",salt)

    //     password = await bcrypt.hash(password, salt)

    //     return this.prisma.users.create({
    //         data: {
    //             name,
    //             email,
    //             password,
    //             birthAt: birthAt ? new Date(birthAt) : null, 
    //         },
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             password: true,
    //             birthAt: true,
    //             role: true,
    //             updatedAt: true,
    //             createdAt: true,
    //         },
    //     });
    // }
    async create(data: CreateUserDTO) {

        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)

        return this.prisma.users.create({
            data,
        });
    }
    

    async list() {
        return this.prisma.users.findMany()
    }


    async getOne(id: number) {

        await this.exists(id)

        return this.prisma.users.findUnique({
            where: {
                id,
            }
        
        })
    }
    
    async update(id: number, {name,email,password,birthAt}: UpdatePutUserDTO) {
        await this.exists(id)

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        return this.prisma.users.update({
            data:{
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt): null
            },
            where: {
                id
            }
        })
    }
    
    async updatePartial(id: number, {name, email, password, birthAt}: UpdatePatchtUserDTO) {
        await this.exists(id)

        const data: any = {};
      
        if (data.birthAt){
            data.birthAt = new Date(data.birthAt)
          }
      
        if (data.name){
            data.name=name
          }
      
        if (data.email){
            data.email=email
          }
      
        if (password){
            const salt = await bcrypt.genSalt()
            data.password = await bcrypt.hash(password, salt)
        }

        return this.prisma.users.update({
            data,
            where: {
                id
            }
        })
    }      
      
    async delete(id:number){
        await this.exists(id)
        
        return this.prisma.users.delete({
            where:{
                id
            }
        })
    }

    async exists(id: number) {
    const user = await this.prisma.users.findUnique({
        where: { id },
    });

    if (!user) {
        throw new NotFoundException(`Usuario ${id} não existe`);
    }
}

}