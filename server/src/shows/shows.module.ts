import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { showProviders } from './show.provider';
import { ShowService } from './show.service';

@Module({
  imports: [DatabaseModule],
  providers: [...showProviders, ShowService],
})
export class PhotoModule {}
