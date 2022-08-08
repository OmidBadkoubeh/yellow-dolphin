import { MulterModuleOptions } from '@nestjs/platform-express';

const multerConfig: MulterModuleOptions = {
  dest: process.env.MULTER_DEST ?? './uploads',
};

export default multerConfig;
