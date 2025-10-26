import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [RootController],
})
export class AppModule {}
