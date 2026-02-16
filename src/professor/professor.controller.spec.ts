import { jest } from "@jest/globals";
import { Test, TestingModule } from "@nestjs/testing";

import { getQueueToken } from "@nestjs/bull";
import { ProfessorController } from "./professor.controller.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";
import { PrismaProfessorRepository } from "./repository/prisma-professor.repository.js";

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
        {
          provide: getQueueToken("professors"),
          useValue: {
            add: jest.fn(),
            process: jest.fn(),
          },
        },
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
