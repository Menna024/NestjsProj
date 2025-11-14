import { IsString, IsEmail, Length } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @IsString()
  @Length(6, 50, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @Length(6, 50, { message: 'Password must be at least 6 characters long' })
  confirmPassword: string;
}
