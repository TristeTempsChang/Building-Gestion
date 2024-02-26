import { ApiProperty } from "@nestjs/swagger";

export class CreateApartmentDto {

  @ApiProperty()
  floor: number;

  @ApiProperty()
  door_number: number;

  @ApiProperty({example: "ID of the type"})
  typeId: number;
}