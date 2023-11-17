import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ShowsRepository } from '../../infrastructure/database/shows.repository';
import { ShowDataDto } from '../dtos/show-data.dto';

@Controller('shows')
export class ShowsController {
  constructor(readonly showsRepository: ShowsRepository) {}

  @Get()
  async findAll() {
    return this.showsRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    return this.showsRepository.findOne(params.id);
  }

  @Post()
  create(@Body() showData: ShowDataDto) {
    return this.showsRepository.create(showData);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() showData: ShowDataDto) {
    return this.showsRepository.update(params.id, showData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.showsRepository.delete(params.id);
  }
}
