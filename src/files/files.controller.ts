import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FileImage, FilePdf } from './decorators/file.decorator';
import { ValidateFilePipe } from './pipes/file-validation.pipe';

@ApiTags('files')
@Controller('files')
export class FilesController {
  @ApiResponse({ status: 200 })
  @FileImage('image')
  @Post('upload/image')
  uploadImage(@UploadedFile(ValidateFilePipe) image: Express.Multer.File) {
    console.log({ image }); // eslint-disable-line
  }

  @ApiResponse({ status: 200 })
  @FilePdf('file')
  @Post('upload/pdf')
  uploadPdf(@UploadedFile(ValidateFilePipe) file: Express.Multer.File) {
    console.log({ file }); // eslint-disable-line
  }
}
