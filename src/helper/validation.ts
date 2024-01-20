import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class Validation {
  isEmpty(value: any) {
    return _.isEmpty(value);
  }
}
