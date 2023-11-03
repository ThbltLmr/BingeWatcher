import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
  // TODO: create a DTO class
  create(@Body() userData: any) {
    // return userData;
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() userData: any) {
    return this.usersService.update(params.id, userData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.usersService.delete(params.id);
  }
}
