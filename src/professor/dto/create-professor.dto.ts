import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProfessorDto {
  @ApiProperty({
    description: "Professor name",
    example: "José da silva",
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: "Professor CPF(Cadastro Pessoa Fisica)",
    example: "000.000.000-00",
  })
  @IsString()
  public readonly cpf: string;
}
