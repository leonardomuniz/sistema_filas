import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ProfessorModule } from "./professor/professor.module.js";

@Module({
  imports: [ProfessorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
