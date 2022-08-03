import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  fullName: string;

  @Prop()
  birthday: Date;

  @Prop()
  password: string;

  @Prop({
    enum: Gender,
    default: Gender.RatherNotSay,
  })
  gender: Gender;

  @Prop({
    type: Types.Array,
    enum: Role,
    default: [Role.User],
  })
  roles: Role[];

  @Prop()
  createDate: Date;

  @Prop()
  updateDate: Date;

  // inside the class definition
  // @Prop({ type: Types.ObjectId, ref: 'Owner' })
  // owner: Owner;

  // In case there are multiple owners
  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Owner' }] })
  // owner: Owner[];
}

export const UserSchema = SchemaFactory.createForClass(User);
