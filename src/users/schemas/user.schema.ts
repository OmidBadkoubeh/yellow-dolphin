import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  /**
   * @description User id
   */
  id: string;

  /**
   * @description User phone number
   */
  @Prop({ unique: true })
  phoneNumber: string;

  /**
   * @description User email
   */
  @Prop({ unique: true })
  email: string;

  /**
   * @description User full name
   */
  @Prop()
  fullName: string;

  /**
   * @description User birth date
   */
  @Prop()
  birthday: Date;

  /**
   * @description User password
   */
  @Prop()
  password: string;

  /**
   * @description User gender
   */
  @Prop({
    enum: Gender,
    default: Gender.RatherNotSay,
  })
  gender: Gender;

  /**
   * @description User role
   */
  @Prop({
    type: Types.Array,
    enum: Role,
    default: [Role.User],
  })
  roles: Role[];

  /**
   * @description User creation date
   */
  @Prop()
  createDate: Date;

  /**
   * @description User last update date
   */
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
