import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
