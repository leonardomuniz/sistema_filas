import { IsString, Length } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @Length(11, 11, {
    message: 'CPF must be 11 characters',
  })
  public readonly cpf: string;
}
