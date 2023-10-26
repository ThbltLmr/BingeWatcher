import { Controller, Post, Get, Body } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('shows')
export class ShowsController {
  constructor(readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return this.showService.findAll();
  }

  @Post()
  // TODO: create a DTO class
  create(@Body() showData: any) {
    // return showData;
    return this.showService.create(showData);
  }
}
