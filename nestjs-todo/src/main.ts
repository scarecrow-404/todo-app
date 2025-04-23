import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const { initializeDatabase } = require('./database/init-db');

async function bootstrap() {
  try {
    if (process.env.AUTO_INIT_DB === 'true') {
      console.log('Initializing database...');
      await initializeDatabase();
    }

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
