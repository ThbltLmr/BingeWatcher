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

  async findOne(id: number): Promise<Show> {
    return this.showRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(showData: any): Promise<Show> {
    const show = new Show();
    show.title = showData.title;
    show.description = showData.description;
    show.numberOfSeasons = showData.numberOfSeasons;
    show.posterURL = showData.posterURL;
    return this.showRepository.save(show);
  }

  async update(id: number, showData: any): Promise<Show> {
    const show = await this.findOne(id);
    show.title = showData.title;
    show.description = showData.description;
    show.numberOfSeasons = showData.numberOfSeasons;
    show.posterURL = showData.posterURL;
    return this.showRepository.save(show);
  }

  async delete(id: number): Promise<any> {
    return this.showRepository.delete(id);
  }
}
