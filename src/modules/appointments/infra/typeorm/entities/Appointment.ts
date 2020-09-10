// import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp')
  date: Date;

  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuidv4();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
