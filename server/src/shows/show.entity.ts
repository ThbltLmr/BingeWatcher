import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  posterURL: string;

  @Column('int')
  numberOfSeasons: number;
}
