import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class DisplayedConfigs {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  config: string;
  @Column({ nullable: true })
  display: boolean;
}
