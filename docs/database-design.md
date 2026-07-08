# Complete Database Design

The database is designed for more than 1 million products, more than 100,000 customers, and high traffic campaigns such as flash sales.

## Core Principles

- PostgreSQL is the source of truth.
- Redis stores carts, sessions, OTPs, rate limits, and hot product counters.
- Elasticsearch stores searchable product documents.
- Product catalog tables are normalized, while search documents are denormalized.
- Monetary values are stored in paisa as integer values.
- All records use `created_at`, `updated_at`, and soft-delete fields where appropriate.

## Main Tables

### users

Stores customer and admin login identities.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| email | varchar | Unique, nullable |
| mobile_number | varchar | Unique, nullable |
| password_hash | varchar | Nullable for social login |
| role | enum | customer, admin, staff |
| status | enum | active, blocked, pending_verification |
| email_verified_at | timestamptz | Optional |
| mobile_verified_at | timestamptz | Optional |
| two_factor_enabled | boolean | Admin required |
| last_login_at | timestamptz | Optional |

Indexes:

- Unique index on `email`
- Unique index on `mobile_number`
- Index on `role`, `status`

### customer_profiles

| Column | Type | Notes |
| --- | --- | --- |
| user_id | uuid | Primary key, FK users |
| first_name | varchar | Required |
| last_name | varchar | Optional |
| gender | varchar | Optional |
| date_of_birth | date | Optional |
| reward_points | integer | Default 0 |
| preferred_language | varchar | en or ne |

### addresses

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK users |
| label | varchar | Home, office, etc. |
| recipient_name | varchar | Required |
| phone | varchar | Required |
| province | varchar | Required |
| district | varchar | Required |
| municipality | varchar | Required |
| ward | varchar | Optional |
| street_address | text | Required |
| landmark | text | Optional |
| is_default | boolean | Default false |

### categories

Supports unlimited categories and subcategories.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| parent_id | uuid | Self FK, nullable |
| name_en | varchar | Required |
| name_ne | varchar | Optional |
| slug | varchar | Unique |
| description | text | Optional |
| icon_url | text | Optional |
| image_url | text | Optional |
| sort_order | integer | Default 0 |
| is_active | boolean | Default true |

Indexes:

- Unique index on `slug`
- Index on `parent_id`
- Index on `is_active`, `sort_order`

Initial categories:

Electronics, Mobile Phones, Computers, Home Appliances, Fashion, Beauty, Health, Home and Living, Kitchen, Grocery, Baby Products, Sports, Automotive, Books, Office Supplies, Gaming, Accessories, Clearance Sale.

### brands

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | varchar | Unique |
| slug | varchar | Unique |
| logo_url | text | Optional |
| is_featured | boolean | Default false |

### products

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| category_id | uuid | FK categories |
| brand_id | uuid | FK brands, nullable |
| sku | varchar | Unique |
| name_en | varchar | Required |
| name_ne | varchar | Optional |
| slug | varchar | Unique |
| short_description | text | Optional |
| description | text | Required |
| product_type | enum | brand_new, clearance, overstock, seasonal_discount, liquidation, promotional |
| status | enum | draft, active, inactive, archived |
| base_price_paisa | integer | Required |
| sale_price_paisa | integer | Optional |
| cost_price_paisa | integer | Admin only |
| currency | varchar | NPR |
| warranty_info | text | Optional |
| return_policy | text | Optional |
| shipping_info | text | Optional |
| average_rating | numeric | Cached |
| review_count | integer | Cached |
| is_featured | boolean | Default false |
| published_at | timestamptz | Optional |

Indexes:

- Unique index on `sku`
- Unique index on `slug`
- Index on `category_id`
- Index on `brand_id`
- Index on `status`, `published_at`
- Index on `product_type`, `status`
- Partial index for active products

### product_variants

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| sku | varchar | Unique |
| variant_name | varchar | Example: 128GB Black |
| price_paisa | integer | Required |
| sale_price_paisa | integer | Optional |
| stock_quantity | integer | Required |
| reserved_quantity | integer | Default 0 |
| low_stock_threshold | integer | Default 5 |
| barcode | varchar | Optional |
| is_active | boolean | Default true |

### product_options

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| name | varchar | Color, Size, Storage |

### product_option_values

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| option_id | uuid | FK product_options |
| value | varchar | Example: Black |

### product_variant_values

Maps variants to selected option values.

| Column | Type | Notes |
| --- | --- | --- |
| variant_id | uuid | FK product_variants |
| option_value_id | uuid | FK product_option_values |

Primary key: `(variant_id, option_value_id)`

### product_images

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| variant_id | uuid | Optional FK |
| image_url | text | Required |
| alt_text | varchar | SEO |
| sort_order | integer | Default 0 |
| is_primary | boolean | Default false |

### product_videos

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| video_url | text | Required |
| thumbnail_url | text | Optional |
| title | varchar | Optional |

### product_specifications

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| group_name | varchar | Example: Display |
| spec_name | varchar | Example: Size |
| spec_value | text | Example: 6.7 inch |
| sort_order | integer | Default 0 |

### inventory_movements

Auditable stock changes.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| variant_id | uuid | FK product_variants |
| movement_type | enum | purchase, sale, return, adjustment, reservation, release |
| quantity | integer | Positive or negative |
| reference_type | varchar | order, refund, manual |
| reference_id | uuid | Optional |
| note | text | Optional |
| created_by | uuid | FK users |

### carts

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Nullable for guest |
| guest_token | varchar | Nullable |
| status | enum | active, converted, abandoned |

### cart_items

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| cart_id | uuid | FK carts |
| product_id | uuid | FK products |
| variant_id | uuid | FK product_variants |
| quantity | integer | Required |
| price_snapshot_paisa | integer | Required |

### wishlists

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK users |
| product_id | uuid | FK products |

Unique index on `(user_id, product_id)`.

### product_comparisons

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Nullable for guest |
| guest_token | varchar | Optional |
| product_id | uuid | FK products |

### recently_viewed_products

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Nullable |
| guest_token | varchar | Optional |
| product_id | uuid | FK products |
| viewed_at | timestamptz | Required |

### orders

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_number | varchar | Unique, human-readable |
| user_id | uuid | Nullable for guest |
| guest_email | varchar | Optional |
| guest_phone | varchar | Optional |
| status | enum | pending, confirmed, packed, shipped, delivered, cancelled, returned |
| payment_status | enum | unpaid, authorized, paid, failed, refunded, partial_refund |
| subtotal_paisa | integer | Required |
| discount_paisa | integer | Default 0 |
| shipping_paisa | integer | Default 0 |
| tax_paisa | integer | Default 0 |
| total_paisa | integer | Required |
| currency | varchar | NPR |
| placed_at | timestamptz | Required |

Indexes:

- Unique index on `order_number`
- Index on `user_id`, `placed_at`
- Index on `status`
- Index on `payment_status`

### order_items

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| product_id | uuid | FK products |
| variant_id | uuid | FK product_variants |
| product_name_snapshot | varchar | Required |
| sku_snapshot | varchar | Required |
| unit_price_paisa | integer | Required |
| quantity | integer | Required |
| total_paisa | integer | Required |

### order_addresses

Stores shipping and billing address snapshots.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| address_type | enum | shipping, billing |
| recipient_name | varchar | Required |
| phone | varchar | Required |
| province | varchar | Required |
| district | varchar | Required |
| municipality | varchar | Required |
| street_address | text | Required |
| landmark | text | Optional |

### payments

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| provider | enum | esewa, khalti, fonepay, connectips, debit_card, credit_card, cash_on_delivery |
| status | enum | pending, successful, failed, cancelled, refunded |
| amount_paisa | integer | Required |
| transaction_id | varchar | Optional |
| provider_payload | jsonb | Sanitized provider metadata |
| paid_at | timestamptz | Optional |

### shipments

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| delivery_method | varchar | Required |
| tracking_number | varchar | Optional |
| status | enum | pending, packed, handed_to_courier, in_transit, delivered, failed |
| estimated_delivery_date | date | Optional |
| shipped_at | timestamptz | Optional |
| delivered_at | timestamptz | Optional |

### shipment_events

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| shipment_id | uuid | FK shipments |
| status | varchar | Required |
| message | text | Required |
| location | varchar | Optional |
| occurred_at | timestamptz | Required |

### coupons

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| code | varchar | Unique |
| discount_type | enum | percentage, fixed_amount, free_shipping |
| discount_value | integer | Percent or paisa |
| min_order_paisa | integer | Optional |
| max_discount_paisa | integer | Optional |
| usage_limit | integer | Optional |
| per_customer_limit | integer | Optional |
| starts_at | timestamptz | Required |
| ends_at | timestamptz | Required |
| is_active | boolean | Default true |

### coupon_redemptions

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| coupon_id | uuid | FK coupons |
| user_id | uuid | Nullable |
| order_id | uuid | FK orders |
| discount_paisa | integer | Required |

### gift_cards

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| code_hash | varchar | Unique |
| initial_balance_paisa | integer | Required |
| remaining_balance_paisa | integer | Required |
| status | enum | active, redeemed, expired, disabled |
| expires_at | timestamptz | Optional |

### reward_point_transactions

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK users |
| points | integer | Positive or negative |
| reason | varchar | Required |
| order_id | uuid | Optional FK orders |

### reviews

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| user_id | uuid | FK users |
| order_item_id | uuid | Optional FK |
| rating | integer | 1 to 5 |
| title | varchar | Optional |
| body | text | Required |
| status | enum | pending, approved, rejected |

### review_images

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| review_id | uuid | FK reviews |
| image_url | text | Required |

### product_questions

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| product_id | uuid | FK products |
| user_id | uuid | FK users |
| question | text | Required |
| status | enum | pending, answered, hidden |

### product_answers

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| question_id | uuid | FK product_questions |
| answered_by | uuid | FK users |
| answer | text | Required |

### returns

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| user_id | uuid | FK users |
| status | enum | requested, approved, rejected, received, refunded |
| reason | varchar | Required |
| details | text | Optional |

### return_items

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| return_id | uuid | FK returns |
| order_item_id | uuid | FK order_items |
| quantity | integer | Required |

### refunds

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| return_id | uuid | Optional FK returns |
| payment_id | uuid | FK payments |
| amount_paisa | integer | Required |
| status | enum | pending, approved, processed, failed |
| reason | text | Optional |

### banners

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| title | varchar | Required |
| image_url | text | Required |
| mobile_image_url | text | Optional |
| target_url | text | Required |
| placement | enum | hero, promo, category, app_promo |
| starts_at | timestamptz | Optional |
| ends_at | timestamptz | Optional |
| sort_order | integer | Default 0 |
| is_active | boolean | Default true |

### campaigns

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | varchar | Required |
| campaign_type | enum | flash_deal, clearance, daily_deal, seasonal, promotional |
| starts_at | timestamptz | Required |
| ends_at | timestamptz | Required |
| is_active | boolean | Default true |

### campaign_products

| Column | Type | Notes |
| --- | --- | --- |
| campaign_id | uuid | FK campaigns |
| product_id | uuid | FK products |
| campaign_price_paisa | integer | Required |
| campaign_stock_limit | integer | Optional |

Primary key: `(campaign_id, product_id)`

### notifications

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | FK users |
| channel | enum | app, email, sms |
| title | varchar | Required |
| message | text | Required |
| read_at | timestamptz | Optional |

### invoices

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| order_id | uuid | FK orders |
| invoice_number | varchar | Unique |
| pdf_url | text | Required |
| issued_at | timestamptz | Required |

### seo_metadata

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| entity_type | varchar | product, category, page |
| entity_id | uuid | Required |
| meta_title | varchar | Required |
| meta_description | text | Required |
| og_title | varchar | Optional |
| og_description | text | Optional |
| og_image_url | text | Optional |
| canonical_url | text | Optional |

### audit_logs

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| actor_id | uuid | FK users |
| action | varchar | Required |
| entity_type | varchar | Required |
| entity_id | uuid | Optional |
| ip_address | inet | Optional |
| user_agent | text | Optional |
| metadata | jsonb | Optional |

## Scaling Notes

- Partition high-volume tables such as `orders`, `order_items`, `inventory_movements`, `audit_logs`, and `notifications` by month once traffic grows.
- Use read replicas for analytics and admin reporting.
- Store product images and invoice PDFs in object storage behind a CDN.
- Keep product search queries in Elasticsearch, not PostgreSQL full scans.
- Use Redis locking for flash-sale stock reservation.

