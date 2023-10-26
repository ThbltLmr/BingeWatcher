import { Module } from '@nestjs/common';
import { ShowsController } from './shows/shows.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ShowsModule } from './shows/shows.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    AuthModule,
    ShowsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // controllers: [ShowsController, AuthController],
  // providers: [AppService],
})
export class AppModule {}
