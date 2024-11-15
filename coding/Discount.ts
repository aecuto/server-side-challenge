type DiscountType = 'fixed' | 'percentage';

interface Discount {
  name: string; // Identifier for the discount
  type: DiscountType; // Type of discount
  value: number; // Discount value (fixed amount or percentage)
  max?: number; // Maximum discount amount for percentage type
}

export class Cart {
  total: number; // The original cart total
  appliedDiscounts: Record<string, Discount>; // Discounts applied to the cart

  constructor(total: number) {
    this.total = total;
    this.appliedDiscounts = {};
  }

  // Apply a discount
  applyDiscount(discount: Discount): void {
    if (this.appliedDiscounts[discount.name]) {
      console.log(`Discount "${discount.name}" is already applied.`);
      return;
    }

    this.appliedDiscounts[discount.name] = discount;
  }

  // Remove a discount by name
  removeDiscount(discountName: string): void {
    if (this.appliedDiscounts[discountName]) {
      delete this.appliedDiscounts[discountName];
    } else {
      console.log(`Discount "${discountName}" not found.`);
    }
  }

  // Calculate the total after discounts
  getDiscountedTotal(): number {
    let discountedTotal = this.total;

    for (const discount of Object.values(this.appliedDiscounts)) {
      if (discount.type === 'fixed') {
        discountedTotal -= discount.value;
      } else if (discount.type === 'percentage') {
        const percentageDiscount = (this.total * discount.value) / 100;
        discountedTotal -= Math.min(
          percentageDiscount,
          discount.max || percentageDiscount,
        );
      }
    }

    return Math.max(0, discountedTotal); // Ensure total doesn't go below 0
  }
}
