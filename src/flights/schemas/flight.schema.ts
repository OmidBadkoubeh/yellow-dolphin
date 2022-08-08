import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '@/users/schemas/user.schema';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  /**
   * @description Flight id
   */
  id: string;

  /**
   * @description Flight name
   */
  @Prop({ required: true })
  name: string;

  /**
   * @description Flight date
   */
  @Prop({ required: true })
  date: Date;

  /**
   * @description Flight starting city
   */
  @Prop({ required: true })
  from: string;

  /**
   * @description Flight destination city
   */
  @Prop({ required: true })
  to: string;

  /**
   * @description Flight max passengers
   */
  @Prop({ required: true, default: 1 })
  maxPassengers: number;

  /**
   * @description Flight bookers
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name, default: [] }] })
  bookers: User[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
