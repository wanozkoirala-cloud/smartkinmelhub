# Testing Plan

## Testing Goals

- Protect checkout, payment, order, and inventory flows.
- Keep product discovery fast and accurate.
- Prevent regressions in admin workflows.
- Validate security controls.
- Confirm performance targets.

## Unit Tests

Backend:

- Auth validation
- OTP verification
- Price calculation
- Coupon calculation
- Tax calculation
- Shipping calculation
- Inventory reservation
- Order status transitions
- Refund state transitions

Frontend:

- Product card rendering
- Search filters
- Cart quantity controls
- Checkout form validation
- Account pages
- Admin forms

## Integration Tests

Test full module workflows:

- Register with email.
- Register with mobile and OTP.
- Login and refresh token.
- Add product to cart.
- Apply coupon.
- Place order with cash on delivery.
- Place order with eSewa.
- Place order with Khalti.
- Reserve and release stock.
- Generate invoice.
- Submit return request.
- Process refund.

## End-to-End Tests

Use Playwright for:

- Homepage loads and product sections appear.
- Search suggestions appear while typing.
- Product filters work.
- Product detail page displays gallery, variants, stock, delivery estimate, warranty, and return policy.
- Customer can complete checkout.
- Customer can download invoice.
- Admin can create product.
- Admin can update inventory.
- Admin can process order.
- Admin can create coupon.

## Performance Tests

Targets:

- Homepage load time under 2 seconds.
- Product page load time under 2 seconds.
- PageSpeed score above 90.

Test:

- Homepage under normal traffic.
- Product page under normal traffic.
- Search under high traffic.
- Flash sale add-to-cart surge.
- Checkout under payment callback load.

Tools:

- Lighthouse
- k6
- WebPageTest
- Database query analysis

## Security Tests

Test:

- CSRF protection.
- XSS prevention in reviews and Q&A.
- SQL injection prevention.
- Broken access control.
- OTP brute force limits.
- Admin 2FA enforcement.
- Payment callback signature validation.
- File upload validation.

## User Acceptance Tests

Customer acceptance:

- Register and log in.
- Browse categories.
- Search and filter.
- View product details.
- Add to wishlist.
- Compare products.
- Add to cart.
- Checkout as guest.
- Checkout as logged-in user.
- Track order.
- Request return.

Admin acceptance:

- Upload product.
- Manage banners.
- Create flash deal.
- Process order.
- Process refund.
- View reports.
- Manage SEO metadata.

## Regression Suite

Run before every production release:

- Auth smoke tests
- Catalog smoke tests
- Search smoke tests
- Cart and checkout smoke tests
- Payment smoke tests
- Admin smoke tests
- SEO smoke tests

