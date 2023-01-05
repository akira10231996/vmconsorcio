import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class Configs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel1: string;

  @Column({ nullable: true })
  tel2: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  officeHours: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  form: string; // a, b, c

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  bank_nome: string;
  @Column({ nullable: true })
  bank_cpf: string;
  @Column({ nullable: true })
  bank_banco: string;
  @Column({ nullable: true })
  bank_agencia: string;
  @Column({ nullable: true })
  bank_conta: string;
  @Column({ nullable: true })
  bank_pix: string;
}
