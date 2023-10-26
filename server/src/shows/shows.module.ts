import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { showProviders } from './show.provider';
import { ShowService } from './show.service';
import { ShowsController } from './shows.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...showProviders, ShowService],
  controllers: [ShowsController],
})
export class ShowsModule {}
