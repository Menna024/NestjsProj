import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class checkPassword implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = Number(value.password);
    console.log(parsedValue);
  }
}
