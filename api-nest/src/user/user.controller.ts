import { Body, Controller, Post, Get, Put, Patch, Param, Delete, ParseIntPipe} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";     
import { UpdatePatchtUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    @Get()
    async read() {
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id)
    }

    @Put(':id')
    async update(@Body() data:UpdatePutUserDTO,@Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id,data);
    }

    @Patch(':id')
    async updateParcial(@Body() data:UpdatePatchtUserDTO, @Param('id', ParseIntPipe) id:number) {
        return this.userService.updatePartial(id, data);
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.userService.delete(id);
    }
}
