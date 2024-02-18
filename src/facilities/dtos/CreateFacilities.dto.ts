import { ApiProperty } from "@nestjs/swagger";

export class CreateFacilitiesDto {

  @ApiProperty()
  name: string

  @ApiProperty()
  isSecure: boolean
}