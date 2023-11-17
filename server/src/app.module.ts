import { Module } from '@nestjs/common';
import { AuthModule } from './shared-kernel/authentication/auth.module';
import { UsersModule } from './bounded-contexts/user-registration/user-registration.module';
import { ConfigModule } from '@nestjs/config';
import { ShowsModule } from './shows/shows.module';
import { WatchedShowsModule } from './watchedShows/watchedShows.module';

@Module({
  imports: [
    AuthModule,
    ShowsModule,
    UsersModule,
    WatchedShowsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
