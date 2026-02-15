import { Test, TestingModule } from "@nestjs/testing";
import { ProfessorService } from "./professor.service";
import { Professor } from "./entities/professor.entity";

describe("ProfessorService", () => {
  let service: ProfessorService;
  const mockProfessor = new Professor("Bob o bobo", "12345678901");

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorService],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
  });

  describe("find services", () => {
    it("should return a professor", () => {
      expect(service.findOne(1)).toStrictEqual(mockProfessor);
    });

    it("should return all professor", () => {
      expect(service.findAll()).toStrictEqual([mockProfessor]);
    });

    it("should not return professor if not found", () => {
      expect(service.findOne(2)).toBeNull();
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
