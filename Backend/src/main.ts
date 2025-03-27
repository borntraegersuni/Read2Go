import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

configDotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Read2Go API')
    .setDescription('API documentation for the Read2Go application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}/api-docs`);
  await app.listen(port);
}
bootstrap();
