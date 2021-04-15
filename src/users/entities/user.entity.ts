import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ nullable: false, default: '' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false, default: '' })
  email: string;

  @Column({ nullable: true, default: 'user' })
  role: string;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;
}
