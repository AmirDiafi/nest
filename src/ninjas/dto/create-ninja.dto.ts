import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  id: string;

  @MinLength(3)
  name: string;

  age: number;

  @IsEnum(['fast', 'slow'])
  type: string;
}
