# Recommended Folder Structure

Use a monorepo so frontend, backend, shared packages, infrastructure, and documentation stay versioned together.

```text
smartkinmelhub/
  apps/
    web/
      app/
        (storefront)/
          page.tsx
          product/[slug]/page.tsx
          category/[slug]/page.tsx
          search/page.tsx
          cart/page.tsx
          checkout/page.tsx
          account/
        admin/
          dashboard/page.tsx
          products/
          orders/
          customers/
          reports/
      components/
        layout/
        catalog/
        product/
        cart/
        checkout/
        account/
        admin/
        ui/
      lib/
        api/
        auth/
        seo/
        i18n/
      public/
      next.config.ts
      package.json
    api/
      src/
        main.ts
        app.module.ts
        modules/
          auth/
          users/
          catalog/
          inventory/
          search/
          cart/
          checkout/
          orders/
          payments/
          shipping/
          returns/
          promotions/
          reviews/
          notifications/
          cms/
          seo/
          admin/
          audit/
        common/
          decorators/
          filters/
          guards/
          interceptors/
          pipes/
          utils/
        config/
        database/
          migrations/
          seeds/
      test/
      package.json
  packages/
    shared/
      src/
        types/
        constants/
        validators/
    eslint-config/
    tsconfig/
  infra/
    docker/
      Dockerfile.web
      Dockerfile.api
    nginx/
    postgres/
    redis/
    elasticsearch/
    ci/
  docs/
  scripts/
    backup/
    seed/
    import-products/
  docker-compose.yml
  package.json
  README.md
```

## Frontend Rendering Strategy

- Homepage: static generation with short revalidation.
- Category pages: server-rendered with cached filters.
- Product pages: static generation for active products with incremental regeneration.
- Cart and checkout: dynamic client/server hybrid.
- Admin dashboard: authenticated dynamic pages.

## Backend Module Pattern

Each NestJS module should follow:

```text
module-name/
  dto/
  entities/
  repositories/
  services/
  controllers/
  events/
  module-name.module.ts
```

## Shared Package Usage

The shared package should contain:

- API response types
- Product type constants
- Currency helpers
- Validation schemas shared between frontend and backend
- Localization keys

