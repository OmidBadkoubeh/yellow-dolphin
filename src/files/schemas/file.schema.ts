import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  /**
   * @description File id
   */
  id: string;

  /**
   * @description File name
   */
  @Prop({ required: true })
  name: string;

  /**
   * @description File path
   */
  @Prop({ required: true })
  path: string;

  /**
   * @description File type
   */
  @Prop()
  mimeType: string;

  /**
   * @description File size (in bytes)
   */
  @Prop()
  size: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
