import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createUserDTO {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
