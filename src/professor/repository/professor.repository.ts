import { Professor } from "../entities/professor.entity.js";

export abstract class ProfessorRepository {
  abstract create(input: Professor): Promise<boolean>;
  abstract findByCpf(cpf: string): Promise<Professor | null>;
}
