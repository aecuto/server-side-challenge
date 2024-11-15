interface Product {
  id: number; // Unique identifier for the product
  name: string; // Product name
  price: number; // Product price
  quantity: number; // Quantity of the product in the cart
}

interface Freebie {
  triggerProductId: number; // The product that triggers the freebie
  freeProduct: Product; // The freebie product to be added
}

class CartFree {
  products: Product[]; // List of products in the cart
  appliedFreebies: Record<number, boolean>; // Tracks applied freebies by trigger product ID

  constructor() {
    this.products = [];
    this.appliedFreebies = {};
  }

  // Add a product to the cart
  addProduct(product: Product): void {
    const existingProduct = this.products.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.products.push({ ...product });
    }
  }

  // Apply a freebie to the cart
  applyFreebie(freebie: Freebie): void {
    // Check if the trigger product exists in the cart
    const triggerProduct = this.products.find(
      (p) => p.id === freebie.triggerProductId,
    );

    if (triggerProduct && !this.appliedFreebies[freebie.triggerProductId]) {
      // Add the freebie product to the cart
      this.addProduct({ ...freebie.freeProduct, price: 0 }); // Ensure freebie is free
      this.appliedFreebies[freebie.triggerProductId] = true; // Mark the freebie as applied
    }
  }

  // Display the cart contents
  displayCart(): void {
    console.log('Cart Contents:');
    this.products.forEach((product) => {
      console.log(
        `- ${product.name}: ${product.quantity} x ${product.price} THB`,
      );
    });
  }
}

// Example usage
const cart = new CartFree();

// Add products to the cart
cart.addProduct({ id: 1, name: 'Product A', price: 500, quantity: 1 });
cart.addProduct({ id: 3, name: 'Product C', price: 300, quantity: 2 });

// Define a freebie: Buy Product A (id: 1), get Product B for free
const freebie: Freebie = {
  triggerProductId: 1,
  freeProduct: { id: 2, name: 'Product B', price: 100, quantity: 1 }, // Price will be set to 0 in the cart
};

// Apply the freebie
cart.applyFreebie(freebie);

// Display the cart
cart.displayCart();
