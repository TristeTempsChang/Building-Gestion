import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BuildingFacilities } from "./building_facilities.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'facilities' })
export class Facilities {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: "Facility name"})
    @Column()
    name: string

    @ApiProperty({ example: false})
    @Column()
    isSecure: boolean

    @OneToMany(() => BuildingFacilities, buildingFacilities => buildingFacilities.facilities)
    buildingFacilities: BuildingFacilities[]

}