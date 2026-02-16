import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Logger,
} from "@nestjs/common";
import { CreateProfessorDto } from "./dto/create-professor.dto.js";
import { UpdateProfessorDto } from "./dto/update-professor.dto.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorCreateUseCase } from "./useCases/professorCreate.useCase.js";

@Controller("professor")
export class ProfessorController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly professorCreateUseCase: ProfessorCreateUseCase,
  ) {}

  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    Logger.log("chegou aqui porra");
    return this.professorCreateUseCase.process(createProfessorDto);
  }

  @Get()
  findAll() {
    Logger.log("chegou aqui");
    return this.professorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.professorService.findOne(+id);
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
