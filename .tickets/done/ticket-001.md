## Description

As a client
I want to be able to get products
so that i can work with them

## Design

Follow standard REST protocols

The following endpoints should be added:

```
- GET /api/products # fetch all products
- GET /api/products/:id # fetch one product by id
- GET /api/products?filter= # fetch X number of products that match the filter
```

To clarify, filters available will be:
GET /api/products?price_lt=X
GET /api/products?price_gt=X

## Use cases

### Use case 1

A web page wants to show all the products available and calls /api/products

### Use case 2

A user has viewed all products and want to see the details of a specific product. The webpage shows only that product, but with all the data.

### Use case 3

The web page that shows all products has a filter where the user can set the max price range for products to show

## Acceptance criteria

- [x] A user can fetch all products
- [x] A user can fetch just one product by id
- [x] A user can filter products by price (less than and greater than)
- [x] If a product is not found by id, reply with 400 bad request
- [x] If a price range is invalid, it should also reply with a 400 bad request
- [x] Whenever a 400 bad request is returned, it should have a clear error message

## Technical notes

- Implemented `GET /api/products` with optional `price_gt` and `price_lt` filters.
- Implemented `GET /api/products/:id` with a `400` response when the product does not exist.
- Added a small product data module that reads from `mock-data.json`.
- Verified success and error responses against the running API.
