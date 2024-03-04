import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Apartment } from "./apartment.entity";
import { BuildingFacilities } from "./building_facilities.entity";

@Entity({ name: 'buildings' })
export class Building {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "10 street Mickeal jackson"})
    @Column()
    address: string;

    @ApiProperty()
    @Column()
    construction_date: Date;

    @OneToMany(() => Apartment, apartment => apartment.building, { cascade: true })
    apartments: Apartment[];

    @OneToMany(() => BuildingFacilities, buildingFacilities => buildingFacilities.building)
    buildingFacilities: BuildingFacilities[];
}
