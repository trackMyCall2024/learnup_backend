import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class GetQuery {
    @IsNumber()
    startQueryAt?: number;
}