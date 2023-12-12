import { ConfigService } from '@nestjs/config';

export class TmdbPosterUrl {
  value: string;
  constructor(value: string) {
    const configServiceInstance = new ConfigService();

    if (!value) {
      throw new Error('Poster URL is required');
    }

    if (
      value.match(configServiceInstance.get<string>('TMDB_API_IMAGE_URL')) ===
      null
    ) {
      throw new Error('Poster URL is invalid');
    }

    this.value = value;
  }
}
