import { Inject, Injectable } from '@nestjs/common';
import { UserOrmEntity } from 'src/shared-kernel/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UsersMapper } from './users.mapper';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { UserEntity } from 'src/bounded-contexts/show-tracking/domain/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserOrmEntity>,
    private userMapper: UsersMapper,
  ) {}

  async findOne(query: GetUserByIdQuery): Promise<UserEntity> {
    const userOrmEntity = await this.usersRepository.findOne({
      where: {
        id: query.id,
      },
    });
    return this.userMapper.toEntity(userOrmEntity);
  }
}
