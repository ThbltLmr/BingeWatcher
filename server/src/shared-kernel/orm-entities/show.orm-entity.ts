import { WatchedShowOrmEntity } from './watched-show.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ShowOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  posterUrl: string;

  @Column('int', { nullable: true })
  numberOfSeasons: number;

  @Column({ nullable: true })
  tmdbId: number;

  @Column('text', { array: true, nullable: true })
  genres: string[];

  @OneToMany(() => WatchedShowOrmEntity, (watchedShow) => watchedShow.show, {
    cascade: true,
  })
  public watchedShows: WatchedShowOrmEntity[];
}
