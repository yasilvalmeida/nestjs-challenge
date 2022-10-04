import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvModule } from './csv/csv.module';
import { ExtractService } from './csv/extract.service';
import { TransformService } from './csv/transform.service';

@Module({
  imports: [CsvModule],
  controllers: [AppController],
  providers: [AppService, ExtractService, TransformService],
})
export class AppModule {}
