import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): { health: string } {
    return { health: 'API running 100%!' };
  }
}
