import { UserOrmEntity } from 'src/shared-kernel/orm-entities/user.orm-entity';
import { UserEntity } from '../../domain/entities/user.entity';

export class UsersMapper {
  toEntity(userOrmEntity: UserOrmEntity) {
    const userEntity = new UserEntity();
    userEntity.id = userOrmEntity.id;
    userEntity.username = userOrmEntity.username;
    userEntity.email = userOrmEntity.email;
    return userEntity;
  }
  toOrmEntity(userEntity: UserEntity) {
    const userOrmEntity = new UserOrmEntity();
    userOrmEntity.id = userEntity.id;
    userOrmEntity.username = userEntity.username;
    userOrmEntity.email = userEntity.email;
    return userOrmEntity;
  }
}
