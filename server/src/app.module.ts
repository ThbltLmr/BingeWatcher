import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ShowsModule } from './shows/shows.module';

@Module({
  imports: [
    AuthModule,
    ShowsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // providers: [AppService],
})
export class AppModule {}
