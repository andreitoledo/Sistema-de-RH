import { IsString, IsNumber, IsEmail, IsBoolean, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsString()
  department: string;

  @IsNumber()
  salary: number;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthday: string;

  @IsDateString()
  hiredAt: string;

  @IsBoolean()
  status: boolean;
}
