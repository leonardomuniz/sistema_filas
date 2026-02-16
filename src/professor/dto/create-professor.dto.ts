import { IsString } from "class-validator";

export class CreateProfessorDto {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly cpf: string;
}
