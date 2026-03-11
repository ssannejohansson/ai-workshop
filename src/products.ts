import { readFile } from "node:fs/promises";

export type Product = {
  id: string;
  name: string;
  price: number;
};

const productsFileUrl = new URL("../mock-data.json", import.meta.url);

export async function getProducts(): Promise<Product[]> {
  const fileContents = await readFile(productsFileUrl, "utf-8");

  return JSON.parse(fileContents) as Product[];
}

export function filterProducts(
  products: Product[],
  priceGt?: number,
  priceLt?: number,
): Product[] {
  return products.filter((product) => {
    if (priceGt !== undefined && product.price <= priceGt) {
      return false;
    }

    if (priceLt !== undefined && product.price >= priceLt) {
      return false;
    }

    return true;
  });
}

export function getProductById(
  products: Product[],
  productId: string,
): Product | undefined {
  return products.find((product) => product.id === productId);
}
