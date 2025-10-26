import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  home() {
    return { service: 'ShopLite API', routes: ['/products', '/products/:id'], ok: true };
  }
}
