import { DataSource } from 'typeorm';
import { WatchedShowOrmEntity } from '../orm-entities/watched-show.orm-entity';

export const watchedShowProviders = [
  {
    provide: 'WATCHED_SHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WatchedShowOrmEntity),
    inject: ['DATA_SOURCE'],
  },
];
