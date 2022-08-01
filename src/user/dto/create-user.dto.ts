import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  public userName: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  public age: number;

  @IsBoolean()
  @IsOptional()
  public status: boolean;

  @IsString()
  @Length(5, 12)
  public password: string;
}
