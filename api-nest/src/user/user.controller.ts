import { Body, Controller, Post, Get, Put, Patch, Param, Delete, ParseIntPipe, UseInterceptors} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";     
import { UpdatePatchtUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptors";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";


@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService){}
    
    // @UseInterceptors(LogInterceptor)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    // @UseInterceptors(LogInterceptor)
    @Roles(Role.Admin)
    @Get()
    async read() {
        return this.userService.list();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async readOne(@ParamId('id', ParseIntPipe) id: number) {
        console.log({id})
        return this.userService.getOne(id)
    }
    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() data:UpdatePutUserDTO,@Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id,data);
    }
    @Roles(Role.Admin)
    @Patch(':id')
    async updateParcial(@Body() data:UpdatePatchtUserDTO, @Param('id', ParseIntPipe) id:number) {
        return this.userService.updatePartial(id, data);
    }
    
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId('id', ParseIntPipe) id:number) {
        return this.userService.delete(id);
    }
}
