import { Router } from "express";
import { filterProducts, getProductById, getProducts } from "../products.js";

const router = Router();

function parsePriceQuery(value: unknown, name: "price_gt" | "price_lt") {
  if (value === undefined) {
    return { value: undefined };
  }

  if (typeof value !== "string") {
    return { error: `${name} must be a valid number.` };
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    return { error: `${name} must be a valid number.` };
  }

  return { value: parsedValue };
}

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.get("/products", async (req, res) => {
  const priceGtResult = parsePriceQuery(req.query.price_gt, "price_gt");

  if (priceGtResult.error) {
    res.status(400).json({ error: priceGtResult.error });
    return;
  }

  const priceLtResult = parsePriceQuery(req.query.price_lt, "price_lt");

  if (priceLtResult.error) {
    res.status(400).json({ error: priceLtResult.error });
    return;
  }

  const products = await getProducts();
  const filteredProducts = filterProducts(
    products,
    priceGtResult.value,
    priceLtResult.value,
  );

  res.json(filteredProducts);
});

router.get("/products/:id", async (req, res) => {
  const products = await getProducts();
  const product = getProductById(products, req.params.id);

  if (!product) {
    res
      .status(400)
      .json({ error: `Product with id ${req.params.id} was not found.` });
    return;
  }

  res.json(product);
});

export default router;
