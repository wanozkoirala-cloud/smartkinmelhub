# Project Documentation

## Business Summary

SmartKinmelHub is a Nepal-focused single-vendor ecommerce platform. The owner manages all product listings, inventory, orders, refunds, discounts, banners, and SEO settings.

The platform sells:

- Brand new products
- Clearance products
- Overstock products
- Seasonal discount products
- Liquidation products
- Promotional products

The platform does not support:

- Third-party sellers
- Marketplace vendors
- Auctions
- Bidding
- Bargaining
- Used products
- Second-hand products

## Brand Identity

- Brand name: SmartKinmelHub
- Tagline: Smart Shopping for Every Nepali
- Primary color: Orange `#FF9900`
- Primary dark color: Dark Blue `#131921`
- Supporting dark color: `#232F3E`
- Background gray: `#F3F3F3`
- Base: White `#FFFFFF`

## Localization

Supported:

- English
- Nepali
- NPR currency
- Nepal time zone

Implementation requirements:

- Store translatable product fields where needed.
- Format currency as NPR.
- Use Asia/Kathmandu time zone for business reports and campaign schedules.
- Keep payment and address forms suitable for Nepal.

## Homepage Content Model

Homepage sections:

1. Hero slider
2. Promotional banners
3. Search bar with autocomplete
4. Product categories
5. Flash Deals
6. Clearance Sale Products
7. Daily Deals
8. Best Sellers
9. New Arrivals
10. Featured Products
11. Recommended Products
12. Trending Products
13. Brand Showcase
14. Customer Testimonials
15. Newsletter Subscription
16. Mobile App Promotion Section
17. Footer Navigation

Each product row should be configurable from the admin dashboard.

## SEO Requirements

Required:

- XML sitemap
- Product schema markup
- Category meta tags
- Product meta tags
- Open Graph support
- Canonical URLs
- Fast page speed

Structured data should include:

- Product name
- Images
- Description
- Brand
- SKU
- Price
- Currency
- Availability
- Rating
- Reviews

## Operational Policies

Recommended store policies:

- Warranty policy should be product-specific.
- Return policy should be product-specific with a store default fallback.
- Refund processing should be auditable.
- Stock reservations should expire if checkout is abandoned.
- Invoices should be generated after order confirmation.

## Analytics Events

Track:

- Product impression
- Product click
- Search query
- Add to cart
- Remove from cart
- Begin checkout
- Payment method selected
- Purchase
- Coupon applied
- Wishlist add
- Review submitted

## Release Phases

### Phase 1: MVP

- Homepage
- Product catalog
- Search
- Product detail pages
- Cart
- Checkout
- Cash on delivery
- eSewa and Khalti
- Customer accounts
- Admin product and order management
- Basic SEO

### Phase 2: Growth

- Fonepay and ConnectIPS
- Gift cards
- Reward points
- Advanced search suggestions
- Product comparison
- Recommendations
- Mobile app promotion

### Phase 3: Scale

- Advanced analytics
- Automated replenishment alerts
- Personalization
- Large campaign tooling
- Warehouse integrations
- Native mobile apps

