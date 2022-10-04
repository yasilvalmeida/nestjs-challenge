import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as readline from 'readline';
import * as events from 'events';

@Injectable()
export class ExtractService {
  async extract(page?: number, qty?: number) {
    const stream = fs.createReadStream('assets/testing.csv');
    const reader = readline.createInterface({ input: stream });
    const result = [];
    if (!page && !qty) {
      reader.on('line', (row) => {
        result.push(row.split(','));
      });
    } else {
      let p = (page - 1) * qty;
      let i = 0;
      reader.on('line', (row) => {
        while (i < p) {
          i++;
        }
        if (p <= qty) {
          result.push(row.split(','));
          i++;
          p++;
        }
      });
    }
    await events.once(reader, 'close');
    return result;
  }
}
