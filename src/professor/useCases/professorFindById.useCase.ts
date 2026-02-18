import { Injectable, Logger } from "@nestjs/common";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { Professor } from "../entities/professor.entity.js";

@Injectable()
export class ProfessorFindByIdUseCase {
  constructor(
    private readonly professorRepository: PrismaProfessorRepository,
  ) {}

  async run(id: string): Promise<Professor | null> {
    const response = await this.professorRepository.findById(id);

    if (!response) {
      Logger.warn(`Professor with ID ${id} not founded, returning null`);

      return null;
    }

    return response;
  }
}
