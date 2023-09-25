import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, ValidateIf, IsObject } from "class-validator";
import { Role } from "src/auth/role/role.enum";

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    roles: Role;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    files: object;
}