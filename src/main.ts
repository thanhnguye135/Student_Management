import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Student Management')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();

  const docs = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();
