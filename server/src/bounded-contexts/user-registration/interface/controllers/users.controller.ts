import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/database/user-registration.repository';
import { UserDataDto } from '../dtos/user-data.dto';
import { GetUserByIdQuery } from '../../infrastructure/queries/get-user-by-id.query';
import { CreateUserCommand } from '../../infrastructure/commands/create-user.command';
import { Email } from '../../domain/value-objects/email.value-object';
import { UpdateUserCommand } from '../../infrastructure/commands/update-user.command';
import { DeleteUserCommand } from '../../infrastructure/commands/delete-user.command';

@Controller('users')
export class UsersController {
  constructor(readonly usersRepository: UsersRepository) {}

  @Get()
  async findAll() {
    return this.usersRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    const query = new GetUserByIdQuery();
    query.id = params.id;
    return this.usersRepository.findOne(query);
  }

  @Post()
  create(@Body() userData: UserDataDto) {
    const command = new CreateUserCommand();
    command.username = userData.username;
    command.password = userData.password;
    command.email = new Email(userData.email);
    return this.usersRepository.create(command);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() userData: UserDataDto) {
    const command = new UpdateUserCommand();
    command.id = params.id;
    command.username = userData.username;
    command.password = userData.password;
    command.email = new Email(userData.email);
    return this.usersRepository.update(command);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    const command = new DeleteUserCommand();
    command.id = params.id;
    return this.usersRepository.delete(command);
  }
}
