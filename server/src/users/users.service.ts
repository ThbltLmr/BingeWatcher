import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(userData: any): Promise<User> {
    const user = new User();
    user.username = userData.username;
    user.password = userData.password;
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: any): Promise<User> {
    const user = await this.findOne(id);
    user.username = userData.username;
    user.password = userData.password;
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
