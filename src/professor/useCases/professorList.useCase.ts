import { Injectable, Logger } from "@nestjs/common";
import { Professor } from "../entities/professor.entity.js";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { ListProfessorInputDto } from "../dto/list-professor-input.js";

@Injectable()
export class ProfessorListUseCase {
  constructor(
    private readonly professorRepository: PrismaProfessorRepository,
  ) {}

  async run(input: ListProfessorInputDto): Promise<Professor[] | []> {
    const response = await this.professorRepository.list(input);

    if (!response) {
      Logger.warn(
        "Professor not founded in this page, returning an empty array",
      );

      return [];
    }

    return response;
  }
}
