import { Module } from '@nestjs/common';
import { AuthModule } from './shared-kernel/authentication/auth.module';
import { UsersModule } from './bounded-contexts/user-registration/user-registration.module';
import { ConfigModule } from '@nestjs/config';
import { ShowTrackingModule } from './bounded-contexts/show-tracking/show-tracking.module';

@Module({
  imports: [
    AuthModule,
    ShowTrackingModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
