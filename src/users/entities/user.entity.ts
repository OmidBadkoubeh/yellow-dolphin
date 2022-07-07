import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Gender } from '../enums/gender.enum';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  phoneNumber: string;

  @Column()
  fullName: string;

  @Column()
  birthday: Date;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.RatherNotSay,
  })
  gender: Gender;

  @Column()
  createDate: Date;

  @Column()
  updateDate: Date;

  @AfterInsert()
  afterInsert() {
    this.createDate = new Date();
  }

  @AfterUpdate()
  afterUpdate() {
    this.updateDate = new Date();
  }
}
