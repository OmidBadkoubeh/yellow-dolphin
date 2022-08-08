import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const MaxFileSize = 10 * 1024 * 1024; // 10MB

@Injectable()
export class ValidateFilePipe implements PipeTransform {
  transform(file: Express.Multer.File, _metadata: ArgumentMetadata): Express.Multer.File {
    if (file === undefined || file === null) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (file?.size > MaxFileSize) {
      throw new BadRequestException(`Validation failed (file size exceeded ${MaxFileSize} bytes)`);
    }

    return file;
  }
}
