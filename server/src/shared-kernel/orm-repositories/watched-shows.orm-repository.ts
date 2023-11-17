import { DataSource } from 'typeorm';
import { WatchedShow } from '../orm-entities/watched-show.orm-entity';

export const watchedShowProviders = [
  {
    provide: 'WATCHED_SHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WatchedShow),
    inject: ['DATA_SOURCE'],
  },
];
