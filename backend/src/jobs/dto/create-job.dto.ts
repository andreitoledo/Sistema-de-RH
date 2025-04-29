import { IsString, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  department: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  status?: string; // "open" ou "closed"
}
