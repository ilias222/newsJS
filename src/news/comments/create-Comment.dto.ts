import { Matches, IsNotEmpty, IsEmail, IsString, IsDateString, IsObject, ValidateIf, isDate } from "class-validator";

export class CommentCreadeDTO {

    @IsString()
    @IsNotEmpty()
    idNews: string;

    @IsString()
    @IsNotEmpty()
    idUser: number;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    nameUser: string;

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    createAt: Date;
}