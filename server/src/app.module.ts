import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ShowsModule } from './shows/shows.module';
import { WatchedShowsModule } from './watchedShows/watchedShows.module';

@Module({
  imports: [
    AuthModule,
    WatchedShowsModule,
    ShowsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  // providers: [AppService],
})
export class AppModule {}
