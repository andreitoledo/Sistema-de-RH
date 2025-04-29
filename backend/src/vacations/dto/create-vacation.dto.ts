import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateVacationDto {
  @IsInt()
  employeeId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  status?: string; // opcional, default é pending
}
