import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ListProfessorInputDto {
  @ApiProperty({
    description: "Size of page",
    example: "10,30,50",
  })
  @IsNumber()
  public readonly pageSize: number;

  @ApiProperty({
    description: "Actual page that is fetching",
    example: "1, 2, 3",
  })
  @IsNumber()
  public readonly page: number;
}
