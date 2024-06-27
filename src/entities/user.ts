import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column() 
  email: string;
}


