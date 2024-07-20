import { IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  id: string;

  @IsString()
  createdAt: string;

  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsString()
  text: string;
}
