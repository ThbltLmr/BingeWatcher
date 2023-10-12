import { Module } from '@nestjs/common';
import { AuthController } from './interface/controllers/auth.controller';
import { ShowsController } from './interface/controllers/shows.controller';

@Module({
  imports: [],
  controllers: [AuthController, ShowsController],
  // providers: [AppService],
})
export class AppModule {}
