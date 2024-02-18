import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "./apartment.entity";

@Entity({ name: 'apartment_types' })
export class Apartment_type {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "type name"})
    @Column()
    name: string;

    @ApiProperty({ example: 1})
    @Column()
    maximum_capacity: number;

    @OneToMany(() => Apartment, apartment => apartment.type)
    apartment: Apartment;
}