import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
