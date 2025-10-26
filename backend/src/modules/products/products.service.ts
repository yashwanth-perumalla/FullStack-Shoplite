import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';

const SOURCE = 'https://fakestoreapi.com/products';
type CacheEntry<T> = { value: T; at: number };
const TTL_MS = 60_000;

@Injectable()
export class ProductsService {
  private cacheAll: CacheEntry<any[]> | null = null;
  private cacheById = new Map<number, CacheEntry<any>>();

  private fresh<T>(entry: CacheEntry<T> | null) {
    return entry && Date.now() - entry.at < TTL_MS ? entry.value : null;
  }

  async list(search?: string) {
    try {
      const cached = this.fresh(this.cacheAll);
      let data: any[];
      if (cached) {
        data = cached;
      } else {
        const res = await fetch(SOURCE);
        if (!res.ok) throw new InternalServerErrorException('Upstream fetch failed');
        data = (await res.json()) as any[];
        this.cacheAll = { value: data, at: Date.now() };
      }
      if (search) {
        const q = search.toLowerCase();
        data = data.filter(
          (p) =>
            String(p.title).toLowerCase().includes(q) ||
            String(p.description).toLowerCase().includes(q)
        );
      }
      return data;
    } catch (err) {
      console.error('products/list error:', err);
      throw new InternalServerErrorException('Failed to load products');
    }
  }

  async one(id: number) {
    try {
      const cached = this.fresh(this.cacheById.get(id) || null);
      if (cached) return cached;

      const res = await fetch(`${SOURCE}/${id}`);
      if (res.status === 404) throw new NotFoundException('Product not found');
      if (!res.ok) throw new InternalServerErrorException('Upstream fetch failed');
      const data = await res.json();
      this.cacheById.set(id, { value: data, at: Date.now() });
      return data;
    } catch (err) {
      console.error('products/one error:', err);
      throw err instanceof NotFoundException ? err : new InternalServerErrorException('Failed to load product');
    }
  }
}
