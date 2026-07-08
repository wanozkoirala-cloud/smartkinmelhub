# Deployment Guide

## Environments

Use separate environments:

- Local
- Staging
- Production

Production domain:

- `https://smartkinmelhub.com`
- `https://www.smartkinmelhub.com`
- `https://api.smartkinmelhub.com`
- `https://admin.smartkinmelhub.com`

## Production Infrastructure

Recommended components:

- CDN for static assets and images.
- Load balancer or reverse proxy.
- Next.js frontend service.
- NestJS API service.
- PostgreSQL primary database with replicas.
- Redis for cache, sessions, OTPs, locks, and queues.
- Elasticsearch cluster for product search.
- Object storage for product images, videos, and invoices.
- Monitoring and logging platform.

## Docker Services

Production services:

- `web`
- `api`
- `postgres`
- `redis`
- `elasticsearch`
- `worker`
- `nginx`

Workers should process:

- Emails
- SMS
- Invoice generation
- Search indexing
- Sitemap generation
- Report exports
- Payment verification retries

## CI/CD Pipeline

Pipeline stages:

1. Install dependencies.
2. Type check.
3. Lint.
4. Unit tests.
5. Integration tests.
6. Build frontend and backend.
7. Build Docker images.
8. Run database migration check.
9. Deploy to staging.
10. Run smoke tests.
11. Manual approval for production.
12. Deploy production.
13. Run production smoke tests.

## Environment Variables

Required groups:

- Database connection
- Redis connection
- Elasticsearch connection
- JWT secrets
- OTP provider credentials
- Email provider credentials
- Payment provider credentials
- Object storage credentials
- CDN configuration
- Analytics keys
- Error tracking DSN

Secrets must be stored in a secret manager, not in source control.

## Deployment Steps

1. Configure DNS for website, API, and admin domains.
2. Enable SSL certificates.
3. Provision PostgreSQL, Redis, and Elasticsearch.
4. Create object storage buckets.
5. Configure CDN.
6. Deploy backend API.
7. Run database migrations.
8. Deploy frontend.
9. Deploy workers.
10. Configure scheduled backups.
11. Run smoke tests.
12. Enable monitoring alerts.

## Performance Configuration

- Serve images through CDN with resizing and WebP/AVIF support.
- Enable HTTP compression.
- Cache homepage and category API responses.
- Use incremental static regeneration for product pages.
- Add database indexes before production launch.
- Use Redis cache for flash deal stock counters.
- Use lazy loading for below-the-fold images.
- Keep JavaScript bundles small by splitting admin and customer code.

## PageSpeed Target

Goal: Google PageSpeed above 90.

Required practices:

- Optimized images.
- Server-side rendering.
- CDN caching.
- Minimal third-party scripts.
- Font optimization.
- Critical CSS handled by Next.js.
- Avoid large homepage sliders on mobile.

