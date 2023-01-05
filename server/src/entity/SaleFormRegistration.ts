import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class SaleFormRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel1: string;

  @Column({ nullable: true })
  tel2: string;

  @Column({ nullable: true })
  admin: string;

  @Column({ nullable: true })
  PaidrailsNum: number;


  @Column({ nullable: true })
  unPaidrailsNum: number;

  @Column({ nullable: true })
  value: number;

  @Column({ nullable: true })
  obs: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  type: string;
}
