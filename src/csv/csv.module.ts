import { TransformService } from './transform.service';
import { ExtractService } from './extract.service';
import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';

@Module({
  controllers: [CsvController],
  providers: [ExtractService, TransformService],
})
export class CsvModule {}
