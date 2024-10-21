import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDTO } from './create-user-dto';
import { SignUpRespone } from './user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async signup(payload: createUserDTO): Promise<SignUpRespone> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists', {
        cause: new Error(),
        description: 'User already exists',
      });
    }
    // * save the user password in encrypted -- bcryptJs

    const hash = await this.encryptPassword(payload.password, 1);
    // * save the user in db
    payload.password = hash;
    // * return id and email
    return await this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  async encryptPassword(plainText, saltRounds) {
    return await bcrypt.hash(plainText, saltRounds);
  }
}
