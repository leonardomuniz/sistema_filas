import { Module } from "@nestjs/common";

import { BullModule } from "@nestjs/bull";
import { ProfessorController } from "./professor.controller.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { PrismaProfessorRepository } from "./repository/prisma-professor.repository.js";

@Module({
  imports: [BullModule.registerQueue({ name: "professors" })],
  controllers: [ProfessorController],
  providers: [
    ProfessorService,
    ProfessorCreateUseCase,
    PrismaService,
    PrismaProfessorRepository,
  ],
})
export class ProfessorModule {}
