import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateProfessorDto } from "./dto/create-professor.dto.js";
import { UpdateProfessorDto } from "./dto/update-professor.dto.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";
import { ProfessorFindByIdUseCase } from "./useCases/professorFindById.useCase.js";

@Controller("professor")
export class ProfessorController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorCreateUseCase: ProfessorCreateUseCase,
    private readonly professorFindByIdUseCase: ProfessorFindByIdUseCase,
  ) {}

  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorCreateUseCase.run(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.professorFindByIdUseCase.run(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.professorService.remove(+id);
  }
}
