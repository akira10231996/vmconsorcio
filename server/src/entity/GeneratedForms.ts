import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeneratedForms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    timestamp: string;

    @Column({ nullable: true })
    readed: boolean;
}