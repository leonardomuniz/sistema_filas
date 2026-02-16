import { Injectable } from "@nestjs/common";
import { Professor } from "./entities/professor.entity.js";
import { UpdateProfessorDto } from "./dto/update-professor.dto.js";
@Injectable()
export class ProfessorService {
  findAll(): Professor[] {
    return [new Professor("id", "Bob o bobo", "12345678901")];
  }

  findOne(id: number): Professor | null {
    const professor = new Professor("id", "Bob o bobo", "12345678901");

    if (id !== 1) {
      return null;
    }
    return professor;
  }

  update(id: number, _updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
