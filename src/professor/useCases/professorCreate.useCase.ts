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

  async handle(input: CreateProfessorDto) {
    await this.queue.add("professor-create", input);
  }

  @Process("professor-create")
  async process(input: CreateProfessorDto): Promise<boolean | undefined> {
    const { cpf, name } = input;

    const isProfessorExists = await this.professorRepository.findByCpf(cpf);
    Logger.log("verify if professor already exists");

    if (isProfessorExists) {
      throw new ConflictException("Professor with this CPF already exists");
    }

    const professor = Professor.create(name, cpf);

    await this.professorRepository.create(professor);

    return true;
  }
}
