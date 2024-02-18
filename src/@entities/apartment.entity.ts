import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Building } from "./building.entity";
import { Owner } from "./owner.entity";
import { Tenant } from "./tenant.entity";
import { Apartment_type } from "./type_apartment.entity";
import { Option } from "./option.entity";

@Entity({ name: 'apartments' })
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Apartment floor"})
    @Column()
    floor: number;

    @ApiProperty({ example: "Apartment door number"})
    @Column()
    door_number: number;

    @ManyToOne(() => Apartment_type, type => type.apartment)
    type: Apartment_type
    
    @ManyToOne(() => Building, building => building.apartments)
    building: Building;

    @ManyToOne(() => Owner, owner => owner.apartments)
    owner: Owner;

    @ManyToMany(() => Option, (option) => option.apartment)
    @JoinTable()
    options: Option[];

    @OneToMany(() => Tenant, tenant => tenant.apartment)
    tenant: Tenant;
}