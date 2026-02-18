import { ConflictException, Injectable, Logger } from "@nestjs/common";

import { CreateProfessorDto } from "../dto/create-professor.dto.js";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { Professor } from "../entities/professor.entity.js";

@Injectable()
export class ProfessorCreateUseCase {
  constructor(
    private readonly professorRepository: PrismaProfessorRepository,
  ) {}

  async run(input: CreateProfessorDto): Promise<boolean> {
    const { name, cpf } = input;
    try {
      const isProfessorExists = await this.professorRepository.findByCpf(cpf);
      Logger.log("verify if professor already exists");

      if (isProfessorExists) {
        Logger.error("Professor with this CPF already exists");
        throw new ConflictException("Professor with this CPF already exists");
      }

      const professor = Professor.create(name, cpf);

      await this.professorRepository.create(professor);

      Logger.log(`Professor ${input.name} added successfully`);

      return true;
    } catch (error) {
      Logger.error(`Error creating professor: ${error}`);

      throw error;
    }
  }
}
