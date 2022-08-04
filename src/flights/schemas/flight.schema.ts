import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '@/users/schemas/user.schema';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop({ type: 'decimal' })
  passengersCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  bookers: User[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
