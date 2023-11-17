import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { UserOrmEntity } from '../../../../shared-kernel/orm-entities/user.orm-entity';
import { UserRegistrationMapper } from './user-registration.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { GetUserByUsernameQuery } from '../queries/get-user-by-username.query';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';

@Injectable()
export class UsersRepository {
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

  async findOne(query: GetUserByIdQuery): Promise<UserEntity> {
    const userOrmEntity = await this.usersRepository.findOne({
      where: {
        id: query.id,
      },
    });
    const userEntity = this.userRegistrationMapper.toEntity(userOrmEntity);
    return userEntity;
  }

  async findOneByUsername(query: GetUserByUsernameQuery): Promise<UserEntity> {
    const userOrmEntity = await this.usersRepository.findOne({
      where: {
        username: query.username,
      },
    });
    const userEntity = this.userRegistrationMapper.toEntity(userOrmEntity);
    return userEntity;
  }

  async create(command: CreateUserCommand): Promise<UserOrmEntity> {
    const user = new UserEntity();
    user.username = command.username;
    user.password = command.password;
    user.email = command.email;
    const userOrmEntity = this.userRegistrationMapper.toOrmEntity(user);
    return this.usersRepository.save(userOrmEntity);
  }

  async update(command: UpdateUserCommand): Promise<UserOrmEntity> {
    const userOrmEntity = await this.usersRepository.findOne({
      where: {
        id: command.id,
      },
    });
    const userEntity = this.userRegistrationMapper.toEntity(userOrmEntity);
    userEntity.username = command.username;
    userEntity.password = command.password;
    userEntity.email = command.email;
    const updatedUserOrmEntity =
      this.userRegistrationMapper.toOrmEntity(userEntity);
    updatedUserOrmEntity.id = command.id;
    return this.usersRepository.save(updatedUserOrmEntity);
  }

  async delete(command: DeleteUserCommand): Promise<DeleteResult> {
    return this.usersRepository.delete(command.id);
  }
}
