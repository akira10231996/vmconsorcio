import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
// Selling Clients
export class ClienteVendendo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nome: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  razao_social: string;

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  endereco: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  obs: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel1: string;

  @Column({ nullable: true })
  tel2: string;

  @Column({ nullable: true })
  ativo_modelo_resposta: boolean;

  @Column({ nullable: true })
  modelo_resposta: string;
}
