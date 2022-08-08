import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (_req: unknown, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    console.log({ file }); // eslint-disable-line
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
    }
  };
}

export function File(fieldName: string, localOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiBody({
      type: 'object',
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiConsumes('multipart/form-data'),
  );
}

export function FilePdf(fieldName: string) {
  return File(fieldName, {
    fileFilter: fileMimetypeFilter('pdf'),
  });
}

export function FileImage(fieldName: string) {
  return File(fieldName, {
    fileFilter: fileMimetypeFilter('image'),
  });
}
