import { DataSource } from 'typeorm';
import { Show } from './show.entity';

export const showProviders = [
  {
    provide: 'SHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Show),
    inject: ['DATA_SOURCE'],
  },
];
