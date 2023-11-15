import { Show } from 'src/shows/entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class WatchedShow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  watchedSeasons: number;

  @ManyToOne(() => User, (user) => user.watchedShows)
  public user: User;

  @ManyToOne(() => Show, (show) => show.watchedShows)
  public show: Show;
}
