import { Module } from '@nestjs/common';
import { Validation } from './validation';
import { Wrapper } from './wrapper';

@Module({
  providers: [Validation, Wrapper],
  exports: [Validation, Wrapper],
})
export class HelperModule {}
