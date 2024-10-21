import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './create-user-dto';

@Controller('users')
export class UsersController {
  // ? Creating a user
  @Post('/signup')
  create(
    @Body()
    createUserDTO: createUserDTO,
  ) {
    // * firstName, lastName,l email, password createdAt
    return createUserDTO;
  }
}
