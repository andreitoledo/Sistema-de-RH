import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateApplicationDto {
  @IsInt()
  jobId: number;

  @IsString()
  candidateName: string;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  resumeLink: string; // link do currículo (pode ser um drive, site, etc.)
}
