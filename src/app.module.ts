import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { PrismaModule } from "./prisma/prisma.module.js";
import { BullConfig } from "./config/bullMq.js";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ProfessorModule } from "./professor/professor.module.js";

@Module({
  imports: [BullModule.forRoot(BullConfig), ProfessorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
