import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../../../shared-kernel/orm-entities/user.orm-entity';
import { UserRegistrationMapper } from './user-registration.mapper';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserOrmEntity>,
    private userRegistrationMapper: UserRegistrationMapper,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const allUserOrmEntities = await this.usersRepository.find();
    const allUserEntities = allUserOrmEntities.map((userOrmEntity) => {
      return this.userRegistrationMapper.toEntity(userOrmEntity);
    });
    return allUserEntities;
  }

  async findOne(id: number): Promise<UserOrmEntity> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<UserOrmEntity> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(userData: any): Promise<UserOrmEntity> {
    const user = new User();
    user.username = userData.username;
    user.password = userData.password;
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: any): Promise<UserOrmEntity> {
    const user = await this.findOne(id);
    user.username = userData.username;
    user.password = userData.password;
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
