import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

function resolveExtension(file: Express.Multer.File): string {
  const mimeExtension = file.mimetype?.split('/')[1]?.split(';')[0];
  if (mimeExtension) {
    return mimeExtension;
  }

  const originalNameExtension = extname(file.originalname || '').replace('.', '');
  return originalNameExtension || 'bin';
}

export function createDiskUploadOptions(destination: string, options: MulterOptions = {}): MulterOptions {
  return {
    ...options,
    storage: diskStorage({
      destination,
      filename: (_req, file, cb) => {
        cb(null, `${uuidv4()}.${resolveExtension(file)}`);
      }
    })
  };
}

export function createMemoryUploadOptions(options: MulterOptions = {}): MulterOptions {
  return {
    ...options,
    storage: memoryStorage()
  };
}
