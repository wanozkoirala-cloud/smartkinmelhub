# Backup Strategy

## Backup Objectives

Recommended production targets:

- Recovery Point Objective: 15 minutes for database.
- Recovery Time Objective: 1 hour for critical services.
- Daily full backups.
- Point-in-time recovery for PostgreSQL.

## What to Back Up

- PostgreSQL database.
- Product images and videos.
- Invoice PDFs.
- User-uploaded review images.
- Environment configuration references.
- Elasticsearch index mappings.
- Application release artifacts.

Do not rely on Elasticsearch as the only product data store. It should be rebuildable from PostgreSQL.

## PostgreSQL Backup Plan

- Enable continuous WAL archiving.
- Take daily full backups.
- Keep hourly incremental or WAL-based recovery points.
- Encrypt backups at rest.
- Store backups in a separate cloud region or account.
- Test restore monthly.

Retention:

- Hourly restore points: 7 days.
- Daily backups: 30 days.
- Monthly backups: 12 months.

## Object Storage Backup Plan

- Enable bucket versioning.
- Enable lifecycle retention.
- Replicate critical buckets to another region or storage account.
- Protect invoice PDFs from accidental deletion.

## Redis Backup Plan

Redis should not be the source of truth, but persistence can help recovery.

- Enable AOF or managed Redis persistence.
- Keep Redis data reconstructable.
- Store carts in PostgreSQL if long-term cart recovery is required.

## Elasticsearch Backup Plan

- Take scheduled snapshots.
- Store index mappings in source control.
- Keep a reindex job that can rebuild search from PostgreSQL.

## Disaster Recovery Procedure

1. Confirm incident scope.
2. Freeze writes if data corruption is suspected.
3. Select restore point.
4. Restore PostgreSQL to a new instance.
5. Validate data integrity.
6. Restore object storage if needed.
7. Rebuild Elasticsearch indexes.
8. Redeploy API and frontend.
9. Run smoke tests.
10. Switch traffic back.
11. Document incident and prevention steps.

## Backup Verification

Monthly restore drill:

- Restore database backup to staging.
- Restore sample images and invoices.
- Rebuild search index.
- Log in as test customer.
- Load homepage.
- Load product page.
- Place test order.
- Generate test invoice.

