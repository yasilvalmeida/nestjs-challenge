import { ExtractService } from './extract.service';
import { Controller, Get, Param } from '@nestjs/common';
import { TransformService } from './transform.service';

@Controller('api/')
export class CsvController {
  constructor(
    private extractService: ExtractService,
    private transformService: TransformService,
  ) {}

  @Get('csv-etl/:page/:qty')
  async extractTransformLoadWithPagination(
    @Param('page') page: number,
    @Param('qty') qty: number,
  ) {
    const csvExtractedArray = await this.extractService.extract(
      !page || page < 0 ? 1 : page,
      !qty || qty < 0 ? 10 : qty,
    );
    const formattedJson = this.transformService.transform(csvExtractedArray);
    return formattedJson;
  }

  @Get('csv-etl/')
  async extractTransformLoad() {
    const csvExtractedArray = await this.extractService.extract();
    const formattedJson = this.transformService.transform(csvExtractedArray);
    return formattedJson;
  }
}
