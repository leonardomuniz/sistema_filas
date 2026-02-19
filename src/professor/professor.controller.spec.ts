import { jest } from "@jest/globals";
import { Test, TestingModule } from "@nestjs/testing";

import { ProfessorController } from "./professor.controller.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";
import { PrismaProfessorRepository } from "./repository/prisma-professor.repository.js";
import { ProfessorFindByIdUseCase } from "./useCases/professorFindById.useCase.js";
import { ProfessorListUseCase } from "./useCases/professorList.useCase.js";

describe("ProfessorController", () => {
  let controller: ProfessorController;
  const mockProfessorRepository = {
    create: jest.fn(),
    findByCpf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [
        ProfessorService,
        ProfessorCreateUseCase,
        ProfessorFindByIdUseCase,
        ProfessorListUseCase,
        {
          provide: PrismaProfessorRepository,
          useValue: mockProfessorRepository,
        },
      ],
    }).compile();

    controller = module.get<ProfessorController>(ProfessorController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
