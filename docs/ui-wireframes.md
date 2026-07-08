# UI Wireframes

The visual direction is modern, premium, minimal, fast, and professional. Use orange `#FF9900`, dark blue `#131921`, white, gray `#F3F3F3`, and dark gray `#232F3E`.

## Storefront Header

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ SmartKinmelHub | Deliver to Nepal | Search products...          Account Cart │
├──────────────────────────────────────────────────────────────────────────────┤
│ All Categories | Flash Deals | Clearance | Daily Deals | New Arrivals | Help │
└──────────────────────────────────────────────────────────────────────────────┘
```

Header requirements:

- Sticky on scroll.
- Large search field with autocomplete.
- Login supports email or mobile.
- Cart count is always visible.
- Mobile header compresses into logo, search, and cart.

## Homepage

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                       │
├──────────────┬───────────────────────────────────────────────┬───────────────┤
│ Categories   │ Hero Slider                                   │ Promo Stack   │
│ Electronics  │ Big campaign image + CTA                      │ Banner 1      │
│ Mobiles      │                                               │ Banner 2      │
│ Fashion      │                                               │ Banner 3      │
├──────────────┴───────────────────────────────────────────────┴───────────────┤
│ Promotional Banners                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Flash Deals: countdown + horizontal product row                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ Clearance Sale Products                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Daily Deals                                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Best Sellers                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ New Arrivals                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Featured Products                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ Recommended Products                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Trending Products                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ Brand Showcase                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ Customer Testimonials                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Newsletter Subscription                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Mobile App Promotion                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer Navigation                                                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Product Card

```text
┌──────────────────────┐
│ Product Image         │
│ Sale badge            │
├──────────────────────┤
│ Product name          │
│ ★★★★☆ rating          │
│ Rs. sale price        │
│ Rs. original price    │
│ Add to Cart | Wishlist│
└──────────────────────┘
```

Product card rules:

- Lazy-load images.
- Keep fixed image ratio.
- Show discount badge when applicable.
- Show stock warning only when stock is low.
- Use quick add where variant selection is not required.

## Category Page

```text
┌──────────────┬───────────────────────────────────────────────────────────────┐
│ Filters      │ Breadcrumbs                                                   │
│ Price        │ Category title                                                │
│ Brand        │ Sort | View toggle                                            │
│ Discount     ├───────────────────────────────────────────────────────────────┤
│ Availability │ Product grid                                                  │
│ Rating       │                                                               │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

Mobile behavior:

- Filters open in a bottom sheet.
- Sort remains easy to reach.
- Product grid becomes two columns.

## Search Results Page

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Results for "mobile phone" | Did you mean "mobile phones"?                   │
├──────────────┬───────────────────────────────────────────────────────────────┤
│ Filters      │ Product results                                               │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

## Product Detail Page

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs                                                                   │
├──────────────┬───────────────────────────────┬───────────────────────────────┤
│ Image gallery │ Product title                 │ Buy box                       │
│ Zoom viewer   │ Rating and reviews            │ Price                         │
│ Videos        │ Variants                      │ Stock                         │
│               │ Description summary           │ Delivery estimate             │
│               │ Specifications                │ Warranty                      │
│               │ Q&A                           │ Add to Cart | Buy Now         │
├──────────────┴───────────────────────────────┴───────────────────────────────┤
│ Frequently Bought Together                                                    │
│ Related Products                                                              │
│ Reviews                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Cart Page

```text
┌───────────────────────────────────────────────────────────────┬──────────────┐
│ Cart items                                                     │ Order Summary│
│ Quantity controls                                              │ Coupon       │
│ Save for later                                                 │ Shipping calc│
└───────────────────────────────────────────────────────────────┴──────────────┘
```

## Checkout Page

```text
┌───────────────────────────────────────────────────────────────┬──────────────┐
│ Contact / Login                                                │ Summary      │
│ Shipping Address                                               │ Coupon       │
│ Delivery Option                                                │ Totals       │
│ Payment Method                                                 │ Place Order  │
└───────────────────────────────────────────────────────────────┴──────────────┘
```

Payment methods:

- eSewa
- Khalti
- Fonepay
- ConnectIPS
- Debit card
- Credit card
- Cash on delivery

## Account Dashboard

```text
┌──────────────┬───────────────────────────────────────────────────────────────┐
│ Account menu │ Recent orders                                                 │
│ Orders       │ Wishlist                                                       │
│ Returns      │ Reward points                                                  │
│ Addresses    │ Notifications                                                  │
│ Invoices     │ Recently viewed                                                │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

## Mobile Homepage

```text
┌─────────────────────────────┐
│ Logo                 Cart   │
│ Search products...          │
├─────────────────────────────┤
│ Hero slider                 │
├─────────────────────────────┤
│ Category icons grid         │
├─────────────────────────────┤
│ Flash Deals horizontal row  │
├─────────────────────────────┤
│ Product sections            │
└─────────────────────────────┘
```

