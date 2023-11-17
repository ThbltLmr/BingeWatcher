import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/shared-kernel/orm-entities/user.orm-entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<UserOrmEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
