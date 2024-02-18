import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "./apartment.entity";

@Entity({ name: 'options' })
export class Option {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "option name"})
    @Column()
    name: string;

    @ManyToMany(() => Apartment, (apartment) => apartment.options)
    apartment: Apartment[]
}