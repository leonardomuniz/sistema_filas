import { Test, TestingModule } from "@nestjs/testing";
import { Professor } from "./entities/professor.entity.js";
import { ProfessorService } from "./professor.service.js";

describe("ProfessorService", () => {
  let service: ProfessorService;
  const mockProfessor = new Professor("id", "Bob o bobo", "12345678901");

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorService],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
  });

  describe("find services", () => {
    it("should return all professor", () => {
      expect(service.findAll()).toStrictEqual([mockProfessor]);
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
