import { ListProfessorInputDto } from "../dto/list-professor-input.js";
import { Professor } from "../entities/professor.entity.js";

export abstract class ProfessorRepository {
  abstract create(input: Professor): Promise<boolean>;
  abstract findByCpf(cpf: string): Promise<Professor | null>;
  abstract findById(id: string): Promise<Professor | null>;
  abstract list(input: ListProfessorInputDto): Promise<Professor[] | []>;
}
