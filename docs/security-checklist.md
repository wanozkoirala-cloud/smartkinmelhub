# Security Checklist

## Transport and Hosting

- Enable SSL/TLS for all domains.
- Redirect HTTP to HTTPS.
- Use HSTS after SSL is verified.
- Keep server packages updated.
- Restrict database and Redis access to private network only.

## Authentication

- Hash passwords with Argon2 or bcrypt.
- Require strong admin passwords.
- Require two-factor authentication for admin users.
- Use short-lived access tokens and rotating refresh tokens.
- Rate-limit login, OTP, and password reset endpoints.
- Lock or challenge suspicious login attempts.

## OTP Security

- Store OTPs hashed in Redis.
- Expire OTPs quickly.
- Rate-limit OTP sends per mobile number and IP.
- Never expose whether a mobile number belongs to an account in sensitive flows.

## Web Security

- Enable CSRF protection for cookie-based sessions.
- Use secure, HTTP-only, SameSite cookies.
- Validate and sanitize all user input.
- Escape user-generated content.
- Use Content Security Policy.
- Prevent XSS in reviews, Q&A, and profile fields.
- Prevent SQL injection with ORM query parameters.
- Validate file uploads by type, size, and content.

## Payments

- Verify all payment callbacks server-side.
- Never trust payment status from frontend redirects.
- Store only safe transaction metadata.
- Do not store raw card details.
- Use payment provider recommended signature verification.
- Reconcile payment records daily.

## Authorization

- Enforce role-based access control for admin APIs.
- Log all admin write actions.
- Prevent customers from accessing other customers' orders, invoices, returns, or addresses.
- Use object-level authorization checks.

## Infrastructure

- Use a secret manager for production secrets.
- Rotate secrets periodically.
- Enable database backups and restore testing.
- Enable audit logs.
- Enable monitoring alerts for login spikes, failed payments, and admin changes.

## API Protection

- Rate-limit public endpoints.
- Add bot protection for checkout and OTP flows.
- Validate request payload size.
- Use request IDs for traceability.
- Return generic error messages for security-sensitive failures.

## Admin Protection

- Restrict admin panel access by role.
- Require 2FA.
- Log IP address and user agent.
- Notify Super Admin of new admin account creation.
- Disable inactive admin accounts.

