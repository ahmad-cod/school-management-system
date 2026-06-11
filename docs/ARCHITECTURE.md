# Architecture Overview

## Goal

Build a small, well-engineered school management system that demonstrates professional backend architecture, database design, frontend craft, security, testing, and operations.

## Architectural Style

The target backend architecture is a layered modular monolith:

```text
HTTP router
  -> request/response schemas
  -> service layer
  -> repository layer
  -> PostgreSQL
```

This is the right level of complexity for the project. It keeps the system understandable for portfolio review while still demonstrating clear separation of concerns.

## Backend Boundaries

Recommended backend package layout:

```text
backend/app/
├── api/
│   └── v1/
│       ├── auth.py
│       ├── students.py
│       ├── classes.py
│       ├── attendance.py
│       ├── academics.py
│       ├── finance.py
│       └── dashboard.py
├── core/
│   ├── config.py
│   ├── errors.py
│   ├── logging.py
│   └── security.py
├── db/
│   ├── pool.py
│   └── transactions.py
├── domains/
│   ├── students/
│   ├── classes/
│   ├── attendance/
│   ├── academics/
│   └── finance/
├── auth/
│   ├── dependencies.py
│   ├── repository.py
│   ├── schemas.py
│   └── service.py
└── main.py
```

Each domain should own:

- API schemas.
- Repository methods.
- Service methods.
- Unit tests.
- API tests.

## Request Flow

1. Router validates input using Pydantic schemas.
2. Auth dependency resolves the current user and role.
3. Service enforces business rules and authorization-sensitive decisions.
4. Repository performs parameterized SQL.
5. Mutating service writes audit logs in the same transaction where practical.
6. Router returns a typed response.

## Error Handling

Target behavior:

- Domain errors become explicit 4xx responses.
- Unexpected errors become generic 500 responses.
- Logs keep diagnostic detail; clients do not receive internal database messages.
- Validation errors are consistent and user-readable.

Recommended domain errors:

- `NotFoundError`
- `ConflictError`
- `ForbiddenError`
- `InvalidStateError`

## Security Model

Roles:

- Admin: full access to school operations.
- Teacher: limited access to assigned classes, student records, attendance, and academic records.

Authentication:

- Passwords hashed with a modern adaptive algorithm.
- Short-lived JWT access tokens.
- Rotating refresh tokens stored server-side as hashes.
- Logout revokes refresh tokens.

Authorization:

- Enforced server-side in dependencies and services.
- Frontend role checks are only for presentation, not enforcement.

## Frontend Architecture

The frontend should be a role-aware SaaS application, not a marketing page.

Target layout:

- Authenticated app shell.
- Sidebar limited to in-scope modules.
- Dashboard as the first screen after login.
- Shared API client with typed request/response contracts.
- Reusable table, filters, empty state, loading state, and error state patterns.
- Dark/light theme toggle.

## Observability

Minimum target:

- Structured JSON logs in backend.
- Request ID attached to logs.
- Health endpoint for service checks.
- Audit logs for business actions.

## API Versioning

Keep `/api/v1` as the public API version prefix. Avoid breaking response shapes inside a version unless the application is still explicitly in pre-release development.
