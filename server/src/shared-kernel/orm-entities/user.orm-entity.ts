import { WatchedShowOrmEntity } from './watched-show.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ nullable: true })
  email: string;

  //TODO: hash password
  @Column()
  password: string;

  @OneToMany(() => WatchedShowOrmEntity, (watchedShow) => watchedShow.show)
  public watchedShows: WatchedShowOrmEntity[];
}
