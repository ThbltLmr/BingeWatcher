import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { ShowOrmEntity } from '../../../../shared-kernel/orm-entities/show.orm-entity';
import { ConfigService } from '@nestjs/config';
import { ShowEntity } from '../../domain/entities/show.entity';
import { ShowTrackingMapper } from './shows.mapper';
import { GetShowById } from '../queries/get-show-by-id.query';
import { CreateShowCommand } from '../commands/create-show.command';
import { UpdateShowCommand } from '../commands/update-show.command';
import { DeleteShowCommand } from '../commands/delete-show.command';

@Injectable()
export class ShowsRepository {
  constructor(
    @Inject('SHOW_REPOSITORY')
    private showRepository: Repository<ShowOrmEntity>,
    private configService: ConfigService,
    private showTrackingMapper: ShowTrackingMapper,
  ) {}

  async findAll(): Promise<ShowEntity[]> {
    const allOrmEntities = await this.showRepository.find();
    const allEntities = allOrmEntities.map((ormEntity) => {
      return this.showTrackingMapper.toEntity(ormEntity);
    });
    return allEntities;
  }

  async findOne(query: GetShowById): Promise<ShowEntity> {
    const showOrmEntity = await this.showRepository.findOne({
      where: {
        id: query.id,
      },
    });
    return this.showTrackingMapper.toEntity(showOrmEntity);
  }

  async create(command: CreateShowCommand): Promise<ShowOrmEntity> {
    await this.checkIfShowExists(command.tmdbId);
    const showEntity = new ShowEntity();
    showEntity.title = command.title;
    showEntity.description = command.description;
    showEntity.posterURL = command.posterUrl;
    showEntity.numberOfSeasons = command.numberOfSeasons;
    showEntity.tmdbId = command.tmdbId;
    showEntity.genres = command.genres;
    const showOrmEntity = this.showTrackingMapper.toOrmEntity(showEntity);
    return this.showRepository.save(showOrmEntity);
  }

  async update(command: UpdateShowCommand): Promise<UpdateResult> {
    const showEntity = await this.findOne({ id: command.id });
    const updatedShowOrmEntity = this.showTrackingMapper.toOrmEntity({
      ...showEntity,
      ...command,
    });
    return this.showRepository.update(command.id, updatedShowOrmEntity);
  }

  async delete(command: DeleteShowCommand): Promise<any> {
    return this.showRepository.delete(command.id);
  }

  private async checkIfShowExists(tmdbId: number): Promise<void> {
    const existingShow = await this.showRepository.findOne({
      where: { tmdbId },
    });
    if (existingShow) {
      throw new Error('Show already exists');
    }
  }
}
