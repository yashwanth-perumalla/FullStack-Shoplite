import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: true, methods: 'GET,POST,OPTIONS' });
    await app.listen(5002);
    console.log('ShopLite API http://localhost:5002');
}
bootstrap();
