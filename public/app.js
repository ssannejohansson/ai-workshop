const feedbackElement = document.getElementById("feedback");
const productCountElement = document.getElementById("product-count");
const productListElement = document.getElementById("product-list");
const productDetailElement = document.getElementById("product-detail");
const filtersForm = document.getElementById("filters-form");
const resetButton = document.getElementById("reset-button");
const priceGtInput = document.getElementById("price-gt");
const priceLtInput = document.getElementById("price-lt");

let activeProductId = null;

function setFeedback(message, isError = false) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = isError ? "#8f4123" : "#715849";
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

function buildQueryString() {
    const params = new URLSearchParams();

    if (priceGtInput.value !== "") {
        params.set("price_gt", priceGtInput.value);
    }

    if (priceLtInput.value !== "") {
        params.set("price_lt", priceLtInput.value);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
}

async function fetchJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Request failed.");
    }

    return data;
}

function renderProductDetail(product) {
    if (!product) {
        productDetailElement.className = "product-detail empty-state";
        productDetailElement.textContent = "Select a product to fetch its details.";
        return;
    }

    productDetailElement.className = "product-detail";
    productDetailElement.innerHTML = `
    <h3>${product.name}</h3>
    <p>Product ID: ${product.id}</p>
    <p>This detail panel is loaded from <strong>/api/products/${product.id}</strong>.</p>
    <span class="detail-price">${formatPrice(product.price)}</span>
  `;
}

async function loadProductDetail(productId) {
    activeProductId = productId;
    setFeedback("Loading product details...");

    try {
        const product = await fetchJson(`/api/products/${productId}`);
        renderProductDetail(product);
        setFeedback(`Loaded ${product.name}.`);

        document.querySelectorAll(".product-button").forEach((button) => {
            button.classList.toggle("active", button.dataset.productId === productId);
        });
    } catch (error) {
        renderProductDetail(null);
        setFeedback(error.message, true);
    }
}

function renderProductList(products) {
    productCountElement.textContent = `${products.length} item${products.length === 1 ? "" : "s"}`;

    if (products.length === 0) {
        productListElement.innerHTML = '<div class="empty-state product-detail">No products matched those filters.</div>';
        renderProductDetail(null);
        return;
    }

    productListElement.innerHTML = products
        .map(
            (product) => `
        <button class="product-button ${product.id === activeProductId ? "active" : ""}" data-product-id="${product.id}">
          <span class="product-name">${product.name}</span>
          <span class="product-meta">${formatPrice(product.price)} · ID ${product.id}</span>
        </button>
      `,
        )
        .join("");

    document.querySelectorAll(".product-button").forEach((button) => {
        button.addEventListener("click", () => {
            loadProductDetail(button.dataset.productId);
        });
    });
}

async function loadProducts() {
    setFeedback("Loading products...");

    try {
        const products = await fetchJson(`/api/products${buildQueryString()}`);
        renderProductList(products);

        if (products.length > 0) {
            const nextProductId = products.some((product) => product.id === activeProductId) ?
                activeProductId :
                products[0].id;
            await loadProductDetail(nextProductId);
            return;
        }

        setFeedback("No products matched those filters.");
    } catch (error) {
        productCountElement.textContent = "0 items";
        productListElement.innerHTML = "";
        renderProductDetail(null);
        setFeedback(error.message, true);
    }
}

filtersForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loadProducts();
});

resetButton.addEventListener("click", async () => {
    filtersForm.reset();
    activeProductId = null;
    await loadProducts();
});

loadProducts();