import { ApiProperty } from "@nestjs/swagger";

export class CreateBuildingDto {

    @ApiProperty()
    address: string;
}