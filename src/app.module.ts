import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from './config/bullMq';

@Module({
  imports: [BullModule.forRoot(BullConfig), ProfessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
