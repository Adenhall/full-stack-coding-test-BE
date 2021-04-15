import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Blogs {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ type: 'text' })
  content: string;
}
