import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { AppModule } from './app.module.js';
import { swaggerConfig } from './swagger.js';

async function generate() {
  // preview: true → chỉ dựng module graph, không khởi tạo service (không gọi mạng/DB)
  const app = await NestFactory.create(AppModule, {
    preview: true,
    logger: false,
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const outDir = join(process.cwd(), 'docs');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    join(outDir, 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  await app.close();
  console.log('Đã tạo docs/openapi.json');
}
void generate();
