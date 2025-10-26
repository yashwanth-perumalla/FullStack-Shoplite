import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  // GET /products?search=shirt
  @Get()
  async list(@Query('search') search?: string) {
    return this.svc.list(search);
  }

  // GET /products/:id
  @Get(':id')
  async one(@Param('id') id: string) {
    return this.svc.one(Number(id));
  }
}
