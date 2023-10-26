import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Show } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    @Inject('SHOW_REPOSITORY')
    private photoRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Show[]> {
    return this.photoRepository.find();
  }
}
