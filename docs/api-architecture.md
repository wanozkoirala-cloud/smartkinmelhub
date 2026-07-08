# API Architecture

The backend should be a NestJS modular monolith first, with clear module boundaries so high-traffic areas can later be split into services.

## API Style

- Public customer API: REST over HTTPS.
- Admin API: REST over HTTPS with stricter role-based access.
- Internal events: message queue pattern for emails, SMS, invoices, indexing, and analytics.
- Realtime updates: WebSocket or Server-Sent Events for admin order alerts and customer order tracking.

## Main Backend Modules

- Auth Module
- Users Module
- Catalog Module
- Inventory Module
- Search Module
- Cart Module
- Checkout Module
- Orders Module
- Payments Module
- Shipping Module
- Returns and Refunds Module
- Promotions Module
- Reviews and Q&A Module
- Notifications Module
- CMS and Banners Module
- SEO Module
- Admin Reporting Module
- Audit Module

## Customer API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/login/mobile`
- `POST /auth/otp/send`
- `POST /auth/otp/verify`
- `POST /auth/social/google`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/password/forgot`
- `POST /auth/password/reset`

### Catalog

- `GET /categories`
- `GET /categories/:slug`
- `GET /products`
- `GET /products/:slug`
- `GET /products/:id/related`
- `GET /products/:id/frequently-bought-together`
- `GET /brands`
- `GET /campaigns/flash-deals`
- `GET /campaigns/daily-deals`
- `GET /campaigns/clearance`

### Search

- `GET /search?q=phone`
- `GET /search/suggestions?q=iphon`
- `GET /search/autocomplete?q=sam`

Supported filters:

- Category
- Brand
- Price range
- Discount
- Availability
- Rating
- Product type

Supported sorting:

- Relevance
- Newest
- Price low to high
- Price high to low
- Highest rated
- Best sellers
- Biggest discount

### Customer Account

- `GET /me`
- `PATCH /me`
- `GET /me/addresses`
- `POST /me/addresses`
- `PATCH /me/addresses/:id`
- `DELETE /me/addresses/:id`
- `GET /me/orders`
- `GET /me/orders/:orderNumber`
- `GET /me/invoices/:orderNumber`
- `GET /me/notifications`
- `PATCH /me/notifications/:id/read`

### Wishlist, Compare, Recently Viewed

- `GET /wishlist`
- `POST /wishlist`
- `DELETE /wishlist/:productId`
- `GET /compare`
- `POST /compare`
- `DELETE /compare/:productId`
- `GET /recently-viewed`
- `POST /recently-viewed`

### Reviews and Questions

- `GET /products/:id/reviews`
- `POST /products/:id/reviews`
- `GET /products/:id/questions`
- `POST /products/:id/questions`

### Cart

- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:id`
- `DELETE /cart/items/:id`
- `POST /cart/save-for-later`
- `POST /cart/apply-coupon`
- `DELETE /cart/coupon`
- `POST /cart/shipping-estimate`

### Checkout

- `POST /checkout/guest`
- `POST /checkout/start`
- `POST /checkout/validate`
- `POST /checkout/place-order`

### Payments

- `POST /payments/esewa/initiate`
- `POST /payments/esewa/verify`
- `POST /payments/khalti/initiate`
- `POST /payments/khalti/verify`
- `POST /payments/fonepay/initiate`
- `POST /payments/fonepay/verify`
- `POST /payments/connectips/initiate`
- `POST /payments/connectips/verify`
- `POST /payments/card/initiate`
- `POST /payments/card/verify`
- `POST /payments/cod/confirm`

### Delivery, Returns, Refunds

- `GET /orders/:orderNumber/tracking`
- `POST /orders/:orderNumber/return-request`
- `GET /returns`
- `GET /refunds`

## Admin API Endpoints

### Dashboard

- `GET /admin/dashboard/summary`
- `GET /admin/dashboard/sales`
- `GET /admin/dashboard/inventory-alerts`
- `GET /admin/dashboard/recent-orders`

### Product Management

- `POST /admin/products`
- `GET /admin/products`
- `GET /admin/products/:id`
- `PATCH /admin/products/:id`
- `DELETE /admin/products/:id`
- `POST /admin/products/:id/images`
- `POST /admin/products/:id/videos`
- `POST /admin/products/import`
- `GET /admin/products/export`

### Inventory

- `GET /admin/inventory`
- `PATCH /admin/inventory/:variantId`
- `GET /admin/inventory/low-stock`
- `GET /admin/inventory/movements`

### Orders and Refunds

- `GET /admin/orders`
- `GET /admin/orders/:id`
- `PATCH /admin/orders/:id/status`
- `POST /admin/orders/:id/shipments`
- `PATCH /admin/shipments/:id/status`
- `GET /admin/returns`
- `PATCH /admin/returns/:id/status`
- `GET /admin/refunds`
- `PATCH /admin/refunds/:id/status`

### Promotions

- `POST /admin/campaigns`
- `GET /admin/campaigns`
- `PATCH /admin/campaigns/:id`
- `DELETE /admin/campaigns/:id`
- `POST /admin/coupons`
- `GET /admin/coupons`
- `PATCH /admin/coupons/:id`
- `POST /admin/gift-cards`

### CMS and SEO

- `POST /admin/banners`
- `GET /admin/banners`
- `PATCH /admin/banners/:id`
- `DELETE /admin/banners/:id`
- `PATCH /admin/seo/:entityType/:entityId`
- `POST /admin/sitemap/regenerate`

### Customers and Reports

- `GET /admin/customers`
- `GET /admin/customers/:id`
- `PATCH /admin/customers/:id/status`
- `GET /admin/reports/sales`
- `GET /admin/reports/products`
- `GET /admin/reports/customers`
- `GET /admin/reports/inventory`

## Request Standards

- All write endpoints validate input with DTO schemas.
- Pagination uses `page`, `limit`, and cursor pagination for large collections.
- All customer-facing prices return NPR display data and paisa integer values.
- All API responses include a request ID.
- Admin writes create audit log entries.

## Search Document Shape

Elasticsearch product documents should include:

- Product ID
- Name in English and Nepali
- Slug
- Category hierarchy
- Brand
- Product type
- Price and sale price
- Discount percentage
- Availability
- Average rating
- Review count
- Best-seller score
- Search keywords
- Autocomplete tokens
- Image URL

## Checkout Flow

1. Validate cart items and stock.
2. Reserve stock with Redis lock and database transaction.
3. Apply coupon, gift card, tax, and shipping.
4. Create pending order.
5. Initiate payment or confirm cash on delivery.
6. Verify payment callback.
7. Confirm order and reduce stock.
8. Generate invoice.
9. Send SMS and email notifications.
10. Push order to fulfillment workflow.

