import { Body, Controller, Post, Get, Put, Patch, Param, Delete} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";     

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body: CreateUserDTO) {
        return {
            method: 'post',
            body
        };
    }

    @Get()
    async read() {
        return {users:[]};
    }

    @Get(':id')
    async readOne(@Param() params) {
        return {users:{}, params};
    }

    @Put(':id')
    async update(@Body() body, @Param() params) {
        return {
            method: 'put', 
            body,
            params
        };
    }

    @Patch(':id')
    async updateParcial(@Body() body, @Param() params) {
        return {
            method: 'patch', 
            body,
            params
        };
    }


    @Delete(':id')
    async delete(@Param() params) {
        return {
            method: 'delete', 
            params
        };
    }
}
