import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BeforeInsert } from "typeorm"
import { Building } from "./building.entity"
import { Facilities } from "./facilities.entity"

@Entity()
export class BuildingFacilities {
    @PrimaryGeneratedColumn()
    buildingFacilitiesId: number

    @Column()
    lastInspection: Date

    @ManyToOne(() => Building, (building) => building.buildingFacilities)
    building: Building

    @ManyToOne(() => Facilities, (facilities) => facilities.buildingFacilities, { onDelete: 'SET NULL' })
    facilities: Facilities
}