import { WatchedShow } from 'src/watchedShows/entities/watchedShow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ nullable: true })
  email: string;

  //TODO: hash password
  @Column()
  password: string;

  @OneToMany(() => WatchedShow, (watchedShow) => watchedShow.show)
  public watchedShows: WatchedShow[];
}
