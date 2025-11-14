import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './authDTO/signup.dto';
import { checkPassword } from 'src/common/pipe/checkPassword.pipe';
import { ZodValidationPipe } from 'src/common/pipe/zod.pipe';
import { signUpSchema } from './authValidation/signup.zod';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('hello')
  sayHello(): string {
    return this.authService.sayHello();
  }

  @Get('hello')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  sayHelloWBody(@Body() SignupDto: SignupDto) {
    console.log({ SignupDto });
  }

  @Get('hello')
  sayHelloWQuery(@Query('age', new ParseIntPipe()) age: number) {
    console.log({ age });
  }

  @Get('hello')
  sayHelloWCustomPipe(@Body(checkPassword) SignupDto: SignupDto) {
    console.log({ SignupDto });
  }
}
