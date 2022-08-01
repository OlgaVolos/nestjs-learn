import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegistrationUserDtoTs {
  @IsString()
  @Length(2, 100)
  public userName: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(5, 12)
  public password: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
