import { Injectable } from "@nestjs/common";
import { UpdateProfessorDto } from "./dto/update-professor.dto";
import { Professor } from "./entities/professor.entity";

@Injectable()
export class ProfessorService {
  findAll(): Professor[] {
    return [new Professor("Bob o bobo", "12345678901")];
  }

  findOne(id: number): Professor | null {
    const professor = new Professor("Bob o bobo", "12345678901");

    if (id !== 1) {
      return null;
    }
    return professor;
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
