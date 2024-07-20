import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsString()
  text: string;

  @IsString()
  userId: string;
}
