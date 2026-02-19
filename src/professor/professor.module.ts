import { Module } from "@nestjs/common";

import { ProfessorController } from "./professor.controller.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { PrismaProfessorRepository } from "./repository/prisma-professor.repository.js";
import { ProfessorFindByIdUseCase } from "./useCases/professorFindById.useCase.js";
import { ProfessorListUseCase } from "./useCases/professorList.useCase.js";

@Module({
  controllers: [ProfessorController],
  providers: [
    ProfessorService,
    ProfessorCreateUseCase,
    ProfessorFindByIdUseCase,
    ProfessorListUseCase,
    PrismaService,
    PrismaProfessorRepository,
  ],
})
export class ProfessorModule {}
