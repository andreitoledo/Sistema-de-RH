import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateEvaluationDto {
  @IsInt()
  employeeId: number;

  @IsDateString()
  evaluationDate: string;

  @IsInt()
  score: number;

  @IsString()
  comments: string;
}
