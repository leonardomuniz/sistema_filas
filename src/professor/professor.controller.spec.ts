import { Test, TestingModule } from "@nestjs/testing";
import { ProfessorController } from "./professor.controller";
import { ProfessorService } from "./professor.service";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase";
import { getQueueToken } from "@nestjs/bull";

describe("ProfessorController", () => {
  let controller: ProfessorController;

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
      ],
    }).compile();

    controller = module.get<ProfessorController>(ProfessorController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
