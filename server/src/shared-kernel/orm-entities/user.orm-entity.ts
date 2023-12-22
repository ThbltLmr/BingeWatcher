import { WatchedShowOrmEntity } from './watched-show.orm-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, unique: true })
  username: string;

  @Column({ nullable: true, unique: true })
  email: string;

  //TODO: hash password
  @Column()
  password: string;

  @OneToMany(() => WatchedShowOrmEntity, (watchedShow) => watchedShow.show, {
    cascade: true,
  })
  public watchedShows: WatchedShowOrmEntity[];
}
