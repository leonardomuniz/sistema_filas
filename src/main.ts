import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("sistema de filas")
    .setDescription("Sistema de fila de cadastro de professores")
    .setVersion("1.0")
    .addTag("filas")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
