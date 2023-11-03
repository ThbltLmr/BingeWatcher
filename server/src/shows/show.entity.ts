import { WatchedShow } from 'src/users/WatchedShow.entity';
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

  @Column('int')
  numberOfSeasons: number;

  @Column()
  tmdbId: number;

  @Column()
  genres: string[];

  @OneToMany(() => WatchedShow, (watchedShow) => watchedShow.show)
  public watchedShows: WatchedShow[];
}
