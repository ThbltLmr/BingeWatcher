import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('shows')
export class ShowsController {
  constructor(readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return this.showService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    return this.showService.findOne(params.id);
  }

  @Post()
  // TODO: create a DTO class
  create(@Body() showData: any) {
    // return showData;
    return this.showService.create(showData);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() showData: any) {
    return this.showService.update(params.id, showData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.showService.delete(params.id);
  }
}
