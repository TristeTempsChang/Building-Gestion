import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "./apartment.entity";

@Entity({ name: 'tenants' })
export class Tenant {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Tenant name"})
    @Column()
    name: string;

    @ManyToOne(() => Apartment, apartment => apartment.tenant)
    apartment: Apartment;
}