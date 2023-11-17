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

@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    return this.usersService.findOne(params.id);
  }

  @Post()
  create(@Body() userData: UserDataDto) {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() userData: UserDataDto) {
    return this.usersService.update(params.id, userData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.usersService.delete(params.id);
  }
}
