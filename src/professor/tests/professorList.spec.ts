import { jest } from "@jest/globals";
import { ProfessorListUseCase } from "../useCases/professorList.useCase.js";
import { TestingModule, Test } from "@nestjs/testing";
import { PrismaProfessorRepository } from "../repository/prisma-professor.repository.js";
import { ListProfessorInputDto } from "../dto/list-professor-input.js";
import { CreateProfessorDto } from "../dto/create-professor.dto.js";
import { Professor } from "../entities/professor.entity.js";

describe("Professor List", () => {
  let useCase: ProfessorListUseCase;

  const mockInput: ListProfessorInputDto = {
    page: 0,
    pageSize: 10,
  };

  const mockProfessorDto: CreateProfessorDto = {
    cpf: "41165900378",
    name: "Bob o bobo",
  };

  const mockProfessor = Professor.create(
    mockProfessorDto.name,
    mockProfessorDto.cpf,
  );

  const mockProfessorRepository = {
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorListUseCase,
        {
          provide: PrismaProfessorRepository,
          useValue: mockProfessorRepository,
        },
      ],
    }).compile();

    useCase = module.get<ProfessorListUseCase>(ProfessorListUseCase);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of professor", async () => {
    mockProfessorRepository.list.mockResolvedValue([mockProfessor]);

    const response = await useCase.run(mockInput);

    expect(response).toEqual([mockProfessor]);
  });

  it("should return an empty list of professor", async () => {
    mockProfessorRepository.list.mockResolvedValue([]);

    const response = await useCase.run(mockInput);

    expect(response).toEqual([]);
  });
});
