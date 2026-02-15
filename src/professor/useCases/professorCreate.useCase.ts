import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";

import { CreateProfessorDto } from "../dto/create-professor.dto";
import type { Job, Queue } from "bull";

@Injectable()
@Processor("professors")
export class ProfessorCreateUseCase {
  constructor(
    @InjectQueue("professors")
    private readonly queue: Queue,
  ) {}

  async handle(input: CreateProfessorDto) {
    await this.queue.add("professor-create", input);
  }

  @Process("professor-create")
  process(_job: Job<CreateProfessorDto>) {
    return `Processado !`;
  }
}
