import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from './create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // ? Creating a user
  @Post('/signup')
  async create(
    @Body()
    createUserDTO: createUserDTO,
  ) {
    // * firstName, lastName,l email, password createdAt
    return await this.userService.signup(createUserDTO);
  }
}
