import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../../infrastructure/database/user-registration.repository';
import { UserDataDto } from '../dtos/UserData.dto';
import { GetUserByIdQuery } from '../../infrastructure/queries/get-user-by-id.query';
import { CreateUserCommand } from '../../infrastructure/commands/create-user.command';
import { Email } from '../../domain/value-objects/email.value-object';

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    const query = new GetUserByIdQuery();
    query.id = params.id;
    return this.usersService.findOne(query);
  }

  @Post()
  create(@Body() userData: UserDataDto) {
    const command = new CreateUserCommand();
    command.username = userData.username;
    command.password = userData.password;
    command.email = new Email(userData.email);
    return this.usersService.create(command);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() userData: UserDataDto) {
    const command
    return this.usersService.update(params.id, userData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.usersService.delete(params.id);
  }
}
