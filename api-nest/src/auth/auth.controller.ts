import { Controller, Post, Body, UseGuards, UseInterceptors, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator  } from "@nestjs/common";
import { AuthLoginDTO} from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { UploadedFile, UploadedFiles } from "@nestjs/common/decorators";
import {join} from 'path';
import { FileService } from "./../file/file.service";

@Controller('auth')
export class AuthController{

    constructor(
        private readonly userService: UserService, 
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ){}


    @Post('login')
    async login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body.email, body.password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() body: AuthForgetDTO) {
        return this.authService.forget(body.email)
    }

    @Post('reset')
    async reset(@Body() body: AuthResetDTO){
        return this.authService.reset(body.password, body.token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async checktoken(@User('email') user ){
        return {'checktoken': 'ok', user}
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType:'image/png'}),
                new MaxFileSizeValidator({maxSize: 1024 * 50}),
            ]
        })) photo: Express.Multer.File
    ) {

        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`);
        
        try {
         await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }

        return {photo};
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }]))
    
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {
        return files;
    }

}

