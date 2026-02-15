import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { BullModule } from '@nestjs/bull';
import { ProfessorCreateUseCase } from './useCases/professorCreate.useCase';

@Module({
  imports: [BullModule.registerQueue({ name: 'professors' })],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorCreateUseCase],
})
export class ProfessorModule {}
