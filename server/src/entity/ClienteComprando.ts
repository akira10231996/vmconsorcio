import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
// Selling Clients
export class ClienteComprando {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  cod: string;

  @Column({ nullable: true })
  data_cadastro: string;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel1: string;

  @Column({ nullable: true })
  tel2: string;

  @Column({ nullable: true })
  mensagem: string;
}
