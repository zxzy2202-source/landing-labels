import { unstable_noStore as noStore } from 'next/cache';
import { db } from '@/db';
import { productOverrides } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_PRODUCTS, ProductCategory } from './productsData';

export async function getProductsWithOverrides(): Promise<ProductCategory[]> {
  noStore();
  // Clone default products
  const products: ProductCategory[] = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));

  try {
    const overrides = await db
      .select()
      .from(productOverrides)
      .where(eq(productOverrides.isEnabled, 1));

    for (const override of overrides) {
      const catIdx = override.categoryIndex;
      const itemIdx = override.itemIndex;

      if (products[catIdx] && products[catIdx].items[itemIdx]) {
        const item = products[catIdx].items[itemIdx];
        if (override.title) item.title = override.title;
        if (override.desc) item.desc = override.desc;
        if (override.longDesc) item.longDesc = override.longDesc;
        if (override.imgUrl) item.img = override.imgUrl;
      }
    }
  } catch (error) {
    console.error('Error resolving product overrides:', error);
  }

  return products;
}
