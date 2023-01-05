import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;
}
