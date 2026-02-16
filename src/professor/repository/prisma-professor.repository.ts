import { PrismaService } from "../../prisma/prisma.service.js";
import { Professor } from "../entities/professor.entity.js";
import { ProfessorRepository } from "./professor.repository.js";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PrismaProfessorRepository implements ProfessorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCpf(cpf: string): Promise<Professor | null> {
    Logger.debug(cpf);
    Logger.debug(this.prisma);
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
