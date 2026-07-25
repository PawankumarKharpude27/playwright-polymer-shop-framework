export const SELECTORS = {
  appShell: 'shop-app',
  appHeader: 'app-header',
  pageContent: 'iron-pages',
  footer: 'footer',
  cartLink: 'a[href="/cart"]',
  categoryLinks: 'shop-tab a',
  productCards: 'shop-list a',
  productTitle: 'h1',
  addToCartButton: 'button[aria-label="Add this item to cart"]',
  sizeSelect: 'select[id="sizeSelect"]',
  quantitySelect: 'select[id="quantitySelect"]',
  cartBadge: '.cart-badge',
} as const;
