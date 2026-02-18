import { jest } from "@jest/globals";
import { Test, TestingModule } from "@nestjs/testing";

import { CreateProfessorDto } from "../dto/create-professor.dto.js";
import { ProfessorCreateUseCase } from "../useCases/professorCreate.useCase.js";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { Professor } from "../entities/professor.entity.js";
import { ConflictException } from "@nestjs/common";

describe("Professor Create", () => {
  let useCase: ProfessorCreateUseCase;

  const mockProfessorDto: CreateProfessorDto = {
    cpf: "41165900378",
    name: "Bob o bobo",
  };

  const mockProfessor = Professor.create(
    mockProfessorDto.name,
    mockProfessorDto.cpf,
  );

  const mockProfessorRepository = {
    create: jest.fn(),
    findByCpf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorCreateUseCase,
        {
          provide: PrismaProfessorRepository,
          useValue: mockProfessorRepository,
        },
      ],
    }).compile();

    useCase = module.get<ProfessorCreateUseCase>(ProfessorCreateUseCase);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create professor", async () => {
    mockProfessorRepository.create.mockResolvedValue(true);

    await useCase.run(mockProfessorDto);
    expect(mockProfessorRepository.create).toHaveBeenCalled();
  });

  it("should not create professor when CPF is already in use", async () => {
    mockProfessorRepository.findByCpf.mockResolvedValue(mockProfessor);

    await expect(useCase.run(mockProfessorDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
