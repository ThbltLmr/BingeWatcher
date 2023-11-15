import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ShowService } from './shows.service';
import { ShowDataDto } from './dtos/ShowData.dto';

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
  create(@Body() showData: ShowDataDto) {
    return this.showService.create(showData);
  }

  @Patch(':id')
  update(@Param() params: any, @Body() showData: ShowDataDto) {
    return this.showService.update(params.id, showData);
  }

  @Delete(':id')
  delete(@Param() params: any) {
    return this.showService.delete(params.id);
  }
}
