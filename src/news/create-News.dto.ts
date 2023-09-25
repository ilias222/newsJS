import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsNotEmpty, IsString, IsDateString, IsObject, ValidateIf } from "class-validator"; 

export class FindOneParams {
    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    descript: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    author: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    dataMess: Date;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    authorid: number;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    categoryid: number;

    @ValidateIf((o) => o.imgTitle)
    @IsObject()
    @ApiProperty()
    imgTitle: object;

    @ValidateIf((o) => o.text)
    @IsString()
    @ApiProperty()
    text: string;
}