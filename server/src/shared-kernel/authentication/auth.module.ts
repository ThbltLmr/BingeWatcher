import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../../bounded-contexts/user-registration/user-registration.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from '../orm-repositories/users.orm-repository';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ...userProviders],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
