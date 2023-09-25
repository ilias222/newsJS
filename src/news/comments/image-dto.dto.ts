import { Matches, IsNotEmpty, IsEmail, IsString, IsDateString, IsObject, ValidateIf } from "class-validator";

export class ImageDTO {
@Matches(/(png$|jpg$|jpeg$|gif$)/)
filename: string;
}