import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "./apartment.entity";

@Entity({ name: 'owners' })
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Name of the owner"})
    @Column()
    name: string;

    @ApiProperty({ example: 99999})
    @Column()
    account_number: number;

    @ApiProperty({ example: true})
    @Column()
    have_TVA: boolean;

    @OneToMany(() => Apartment, apartment => apartment.owner)
    apartments: Apartment[];
}