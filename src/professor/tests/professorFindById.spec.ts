import { jest } from "@jest/globals";
import { ProfessorFindByIdUseCase } from "../useCases/professorFindById.useCase.js";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { CreateProfessorDto } from "../dto/create-professor.dto.js";
import { Professor } from "../entities/professor.entity.js";

describe("Professor Find By Id", () => {
  let useCase: ProfessorFindByIdUseCase;

  const mockId: string = "dan23245sodnach083";

  const mockProfessorDto: CreateProfessorDto = {
    cpf: "41165900378",
    name: "Bob o bobo",
  };

  const mockProfessor = Professor.create(
    mockProfessorDto.name,
    mockProfessorDto.cpf,
  );

  const mockProfessorRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorFindByIdUseCase,
        {
          provide: PrismaProfessorRepository,
          useValue: mockProfessorRepository,
        },
      ],
    }).compile();

    useCase = module.get<ProfessorFindByIdUseCase>(ProfessorFindByIdUseCase);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a professor when you pass correct id", async () => {
    mockProfessorRepository.findById.mockResolvedValue(mockProfessor);

    await useCase.run(mockId);
    expect(mockProfessorRepository.findById).toHaveBeenCalled();
  });

  it("should return null if professor do not exist", async () => {
    mockProfessorRepository.findById.mockResolvedValue(null);

    const response = await useCase.run(mockId);
    expect(response).toBe(null);
  });
});
