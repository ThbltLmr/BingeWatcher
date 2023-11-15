import { WatchedShow } from '../../watchedShows/entities/watchedShow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column('int', { nullable: true })
  numberOfSeasons: number;

  @Column({ nullable: true })
  tmdbId: number;

  @Column('text', { array: true, nullable: true })
  genres: string[];

  @OneToMany(() => WatchedShow, (watchedShow) => watchedShow.show)
  public watchedShows: WatchedShow[];
}
