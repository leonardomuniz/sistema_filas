import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { ConflictException, Injectable, Logger } from "@nestjs/common";

import type { Job, Queue } from "bull";
import { CreateProfessorDto } from "../dto/create-professor.dto.js";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { Professor } from "../entities/professor.entity.js";

@Injectable()
@Processor("professors")
export class ProfessorCreateUseCase {
  constructor(
    @InjectQueue("professors")
    private readonly queue: Queue,
    private readonly professorRepository: PrismaProfessorRepository,
  ) {}

  async handle(input: CreateProfessorDto): Promise<boolean> {
    const isProfessorExists = await this.professorRepository.findByCpf(
      input.cpf,
    );
    Logger.log("verify if professor already exists");

    if (isProfessorExists) {
      Logger.error("Professor with this CPF already exists");
      throw new ConflictException("Professor with this CPF already exists");
    }

    Logger.log("Adding professor to queue");

    await this.queue.add("professor-create", input);
    Logger.log(`Professor ${input.name} added successfully`);

    return true;
  }

  @Process("professor-create")
  async process(input: Job<CreateProfessorDto>): Promise<boolean> {
    try {
      const professor = Professor.create(input.data.name, input.data.cpf);

      await this.professorRepository.create(professor);

      return true;
    } catch (error) {
      Logger.error(`Error creating professor: ${error}`);

      throw error;
    }
  }
}
