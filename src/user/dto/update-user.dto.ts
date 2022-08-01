import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 15)
  public userName: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  public age: number;

  @IsBoolean()
  @IsOptional()
  public status: boolean;
}
