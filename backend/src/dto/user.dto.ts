import { IsNotEmpty, IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  role: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  password: string;
}
