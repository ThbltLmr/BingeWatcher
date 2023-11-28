import { UserOrmEntity } from 'src/shared-kernel/orm-entities/user.orm-entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';

export class UserRegistrationMapper {
  toOrmEntity(user: UserEntity): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.username = user.username;
    ormEntity.password = user.password;
    ormEntity.email = user.email.value;
    return ormEntity;
  }
  toEntity(userOrmEntity: UserOrmEntity): UserEntity {
    const user = new UserEntity();
    user.id = userOrmEntity.id;
    user.username = userOrmEntity.username;
    user.password = userOrmEntity.password;
    user.email = new Email(userOrmEntity.email);
    return user;
  }
}
