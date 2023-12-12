import { ShowOrmEntity } from './show.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class WatchedShowOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  watchedSeasons: number;

  @ManyToOne(() => UserOrmEntity, (user) => user.watchedShows)
  public user: UserOrmEntity;

  @ManyToOne(() => ShowOrmEntity, (show) => show.watchedShows)
  public show: ShowOrmEntity;
}
