import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { swaggerConfig } from './swagger.js';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự bỏ các field không khai báo trong DTO
      forbidNonWhitelisted: true, // hoặc báo lỗi 400 nếu gửi field lạ
      transform: true, // chuyển body thành instance DTO, "1" -> 1 cho param
      exceptionFactory: (validationErrors: ValidationError[]=[]) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            [error.property]: Object.values(error.constraints ?? {})[0],
          })),
        )
      }
    })
  );
  app.enableCors();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
