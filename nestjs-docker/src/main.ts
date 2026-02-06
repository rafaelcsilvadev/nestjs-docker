import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do DocumentBuilder
  const config = new DocumentBuilder()
    .setTitle('Minha API NestJS')
    .setDescription('Descrição detalhada da API')
    .setVersion('1.0')
    .addTag('users') // Opcional: organiza por tags
    .build();

  // Criação do documento
  const document = SwaggerModule.createDocument(app, config);

  // Setup do endpoint da documentação (ex: http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
