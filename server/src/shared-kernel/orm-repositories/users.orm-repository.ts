import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../orm-entities/user.orm-entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserOrmEntity),
    inject: ['DATA_SOURCE'],
  },
];
