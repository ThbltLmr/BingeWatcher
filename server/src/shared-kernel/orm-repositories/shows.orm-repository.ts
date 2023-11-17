import { DataSource } from 'typeorm';
import { Show } from '../orm-entities/show.orm-entity';

export const showProviders = [
  {
    provide: 'SHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Show),
    inject: ['DATA_SOURCE'],
  },
];
