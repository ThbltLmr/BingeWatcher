import { DataSource } from 'typeorm';
import { ShowOrmEntity } from '../orm-entities/show.orm-entity';

export const showProviders = [
  {
    provide: 'SHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ShowOrmEntity),
    inject: ['DATA_SOURCE'],
  },
];
