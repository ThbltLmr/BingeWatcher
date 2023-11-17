import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShowOrmEntity } from '../../shared-kernel/orm-entities/show.orm-entity';
import { ConfigService } from '@nestjs/config';
import { ShowDataDto } from '../dtos/ShowData.dto';

@Injectable()
export class ShowService {
  constructor(
    @Inject('SHOW_REPOSITORY')
    private showRepository: Repository<ShowOrmEntity>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<ShowOrmEntity[]> {
    return this.showRepository.find();
  }

  async findOne(id: number): Promise<ShowOrmEntity> {
    return this.showRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(showData: ShowDataDto): Promise<ShowOrmEntity> {
    await this.checkIfShowExists(showData.tmdbId);
    const show = this.createShowOrmEntity(showData);
    return this.showRepository.save(show);
  }

  async update(id: number, showData: ShowDataDto): Promise<ShowOrmEntity> {
    const show = await this.findOne(id);
    this.updateShowEntity(showData, show);
    return this.showRepository.save(show);
  }

  async delete(id: number): Promise<any> {
    return this.showRepository.delete(id);
  }

  private async checkIfShowExists(tmdbId: number): Promise<void> {
    const existingShow = await this.showRepository.findOne({
      where: { tmdbId },
    });
    if (existingShow) {
      throw new Error('Show already exists');
    }
  }

  private createShowOrmEntity(showData: ShowDataDto): ShowOrmEntity {
    const show = new ShowOrmEntity();
    this.updateShowEntity(showData, show);
    return show;
  }

  private updateShowEntity(
    showData: ShowDataDto,
    show: ShowOrmEntity,
  ): ShowOrmEntity {
    show.title = showData.title;
    show.description = showData.description;
    show.numberOfSeasons = showData.numberOfSeasons;
    show.posterURL =
      this.configService.get<string>('TMDB_API_IMAGE_URL') + showData.posterURL;
    show.tmdbId = showData.tmdbId;
    show.genres = showData.genres;
    return show;
  }
}
