import { Test, TestingModule } from "@nestjs/testing";
import { ProfessorCreateUseCase } from "../useCases/professorCreate.useCase";
import { Professor } from "../entities/professor.entity";
import { getQueueToken } from "@nestjs/bull";
import { CreateProfessorDto } from "../dto/create-professor.dto";
import { Job } from "bull";

describe("Professor Create", () => {
  let useCase: ProfessorCreateUseCase;
  const mockQueue = {
    add: jest.fn(),
  };
  const mockProfessor = new Professor("Bob o bobo", "12345678901");

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessorCreateUseCase,
        {
          provide: getQueueToken("professors"),
          useValue: mockQueue,
        },
      ],
    }).compile();

    useCase = module.get<ProfessorCreateUseCase>(ProfessorCreateUseCase);
  });

  it("should add professor to queue", async () => {
    await useCase.handle(mockProfessor);
    expect(mockQueue.add).toHaveBeenCalledWith(
      "professor-create",
      mockProfessor,
    );
  });

  it("should create professor", () => {
    const mockJob = {
      data: mockProfessor,
    } as Job<CreateProfessorDto>;

    const result = useCase.process(mockJob);
    expect(result).toContain("Processado !");
  });
});
