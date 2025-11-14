import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      console.log(result.error);
    }
    return result.data;
  }
}
