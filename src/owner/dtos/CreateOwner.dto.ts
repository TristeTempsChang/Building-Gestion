import { ApiProperty } from "@nestjs/swagger";

export class CreateOwnerDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    account_number: number;

    @ApiProperty()
    have_TVA: boolean;
}