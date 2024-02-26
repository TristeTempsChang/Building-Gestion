import { ApiProperty } from '@nestjs/swagger';

export class AssignOptionDto {

  @ApiProperty({example: "Ids of existing apartment"})
  apartmentId: number;

  @ApiProperty({example: "Ids of existing option (check exemple below)"})
  optionIds: number[];
}
