# Full Cycle Monolithic System

## Overview

This project is a modular monolithic system built with Node.js, TypeScript, Express, and Sequelize (with SQLite for development/testing). It follows Domain-Driven Design (DDD) principles, organizing business logic into modules such as Product Administration, Client Administration, Store Catalog, Checkout, Invoice, and Payment. The system uses Sequelize migrations (managed by Umzug) and is fully covered by E2E and unit tests using Jest and Supertest.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Database & Migrations](#database--migrations)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Modules Overview](#modules-overview)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [License](#license)

---

## Features

- Modular DDD-inspired architecture
- Express API with RESTful endpoints
- Sequelize ORM with SQLite (dev/test)
- Database migrations managed by Umzug
- Comprehensive E2E and unit test coverage (Jest, Supertest)
- Facade pattern for business orchestration

---

## Project Structure

```
fc-monolito/
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tslint.json
├── src/
│   ├── infrastructure/
│   │   └── api/
│   │       ├── express.ts
│   │       ├── server.ts
│   │       ├── db/
│   │       │   └── sequelize/
│   │       │       └── migrations/
│   │       └── routes/
│   │           ├── product.route.ts
│   │           ├── client.route.ts
│   │           ├── checkout.route.ts
│   │           └── invoice.route.ts
│   └── modules/
│       ├── product-adm/
│       ├── client-adm/
│       ├── store-catalog/
│       ├── checkout/
│       ├── invoice/
│       └── payment/
└── ...
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd fc-monolito
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   - The project uses SQLite by default (no extra setup needed for dev/test).
   - TypeScript, Jest, and Sequelize are pre-configured.

---

## Database & Migrations

- **Migrations are located at:** `src/infrastructure/api/db/sequelize/migrations`
- **To run all migrations:**
  ```bash
  npm run migrate
  ```
  _(Ensure this runs before starting the app or running tests)_
- **Migration management is handled by Umzug (see `migrator.ts`).**

---

## Running the Application

- **Start the API server:**
  ```bash
  npm start
  ```
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **API will be available at:** `http://localhost:3000`

---

## Testing

- **Run all tests (type-check + Jest):**
  ```bash
  npm test
  ```
- **E2E tests:** Located in `src/infrastructure/api/__tests__/*.e2e.spec.ts`
- **Unit tests:** Located in each module's `repository` and `usecase` folders
- **Test coverage:** All main flows (product, client, checkout, invoice) are covered

---

## Modules Overview

### Product Administration (`product-adm`)

- Manage products (add, update sales price)
- Product entity, repository, facade, and use cases

### Client Administration (`client-adm`)

- Manage clients (add, find)
- Client entity, repository, facade, and use cases

### Store Catalog (`store-catalog`)

- Product catalog queries
- Facade and use cases

### Checkout (`checkout`)

- Place orders (with client and product validation)
- Order entity, repository, facade, and use cases

### Invoice (`invoice`)

- Generate and retrieve invoices
- Invoice entity, repository, facade, and use cases

### Payment (`payment`)

- Process payments and transactions
- Transaction entity, repository, facade, and use cases

---

## API Endpoints

### Product

- `POST /products` — Add a new product
- `PUT /products/sales-price/:id` — Update product sales price

### Client

- `POST /clients` — Add a new client

### Checkout

- `POST /checkout` — Place an order

### Invoice

- `GET /invoice/:id` — Get invoice by ID

---

## Development

- **TypeScript:** Strict mode, decorators enabled
- **Linting:** TSLint (`tslint.json`)
- **Testing:** Jest + Supertest
- **Migrations:** Sequelize + Umzug
- **ORM:** Sequelize-Typescript

---

## License

MIT
