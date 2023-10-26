import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Show } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    @Inject('SHOW_REPOSITORY')
    private showRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async create(showData: any): Promise<Show> {
    const show = new Show();
    show.title = showData.title;
    show.description = showData.description;
    show.numberOfSeasons = showData.numberOfSeasons;
    return this.showRepository.save(show);
  }
}
