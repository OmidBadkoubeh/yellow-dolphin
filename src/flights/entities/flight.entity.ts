import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '@/users/entities/user.entity';

export class Flight {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('datetime')
  date: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'decimal' })
  passengersCount: number;

  @Column()
  @ManyToMany(() => User, (user) => user.flights)
  bookers: User[];
}
