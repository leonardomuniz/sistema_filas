import { PrismaService } from "../../prisma/prisma.service.js";
import { ListProfessorInputDto } from "../dto/list-professor-input.js";
import { Professor } from "../entities/professor.entity.js";
import { ProfessorRepository } from "./professor.repository.js";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PrismaProfessorRepository implements ProfessorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(input: ListProfessorInputDto): Promise<Professor[] | []> {
    const { page, pageSize } = input;

    const pageNumber = page && page > 0 ? page : 1;

    const limit = pageSize && pageSize > 0 ? pageSize : 10;

    const skip = (pageNumber - 1) * pageSize;

    const list = (await this.prisma.professor.findMany({
      take: limit,
      skip,
      orderBy: {
        name: "desc",
      },
    })) as Professor[] | [];

    return list;
  }

  async findById(id: string): Promise<Professor | null> {
    Logger.log(`Find professor by ID ${id}`);
    const professor = (await this.prisma.professor.findUnique({
      where: {
        id: id,
      },
    })) as Professor | null;

    if (!professor) {
      return null;
    }

    return professor;
  }

  async findByCpf(cpf: string): Promise<Professor | null> {
    Logger.log(`Find professor by CPF ${cpf}`);
    const professor = (await this.prisma.professor.findUnique({
      where: {
        cpf: cpf,
      },
    })) as Professor | null;

    if (!professor) {
      return null;
    }

    return professor;
  }

  async create(professor: Professor): Promise<boolean> {
    Logger.log("Creating new professor");

    await this.prisma.professor.create({
      data: {
        id: professor.id,
        name: professor.name,
        cpf: professor.cpf,
      },
    });

    Logger.log(`Professor ${professor.name} created`);
    return true;
  }
}
