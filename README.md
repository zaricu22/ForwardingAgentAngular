# ForwardingAgentAngular

[![CI/CD](https://github.com/zaricu22/ForwardingAgentAngular/actions/workflows/ghpages-build.yml/badge.svg)](https://github.com/zaricu22/ForwardingAgentAngular/actions/workflows/ghpages-build.yml)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)](https://angular.dev)

An Angular 17 single-page application for a freight forwarding platform — connecting carriers and manufacturers for delivery management.

---

## Live Demo

[https://zaricu22.github.io/ForwardingAgentAngular/](https://zaricu22.github.io/ForwardingAgentAngular/)

> First API call may take ~2 minutes — backend runs on Render free tier.

---

## Features

| Role | Screen | What you can do |
|---|---|---|
| All | Landing | Platform overview and entry point |
| All | Auth | Register and login with role assignment |
| Carrier | Dashboard | View company profile and fleet summary |
| Carrier | Drivers | Manage drivers and assignments |
| Carrier | Jobs | Browse available delivery jobs |
| Carrier | Trucks | Manage truck fleet (add, edit, delete) |
| Carrier | Trailers | Manage trailer fleet (add, edit, delete) |
| Carrier | Deliveries | Track active and completed deliveries |
| Manufacturer | Dashboard | View company profile |
| Manufacturer | Create Delivery | Post a new delivery order |
| Manufacturer | Trucks | Browse trucks available for hire |
| Manufacturer | Trailers | Browse trailers available for hire |

---

## Tech Stack

| | Technology |
|---|---|
| Framework | Angular 17.1 — NgModule-based components |
| Language | TypeScript 5.3 |
| UI | PrimeNG 17 + Bootstrap 5.3 + Bootstrap Icons 1.11 + Font Awesome 4 |
| Charts | Chart.js 4 + PrimeFlex |
| Reactivity | RxJS 7.8 |
| HTTP | Angular `HttpClient` with JWT interceptor |
| Unit tests | Karma + Jasmine |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Test Accounts

| Username | Password | Role |
|----------|----------|------|
| `aa` | `aa` | CARRIER |
| `bb` | `bb` | MANUFACTURER |
| `hjk` | `hjk` | MANUFACTURER |

> **Known issue:** The login button has a UI bug where only the bottom portion of the button surface is clickable.

---

## Prerequisites

- **Node.js 20+** — `node --version`
- **npm 9+** — `npm --version`
- **Angular CLI 17** — `npm install -g @angular/cli@17`

---

## Installation

```bash
git clone https://github.com/zaricu22/ForwardingAgentAngular.git
cd ForwardingAgentAngular
npm ci
```

---

## Running Locally

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

---

## CI/CD Pipeline

Every push to `main` triggers a build (`ng build --base-href`) and deploys the `browser/` output to the `gh-pages` branch via `peaceiris/actions-gh-pages`.
> GitHub Pages must be configured: **Settings → Pages → Source: `gh-pages` branch, `/ (root)`**.

---

## API Connection

Base URL (prod): `https://forwarding-agent-service.onrender.com/Transport`

| Area | Method | Endpoint | Service |
|---|---|---|---|
| Auth — login | `POST` | `/auth/login` | `AuthService` |
| Auth — register | `POST` | `/auth/register` | `AuthService` |
| Auth — check credentials | `POST` | `/auth/credExist` | `AuthService` |
| Carrier — profile | `GET` | `/carr/getCarrier/:id` | `CarrService` |
| Carrier — trucks (paginated) | `GET` | `/carr/truckPage` | `CarrService` |
| Carrier — create truck | `POST` | `/carr/createTruck/:id` | `CarrService` |
| Carrier — update truck | `PUT` | `/carr/updateTruck` | `CarrService` |
| Carrier — delete truck | `DELETE` | `/carr/deleteTruck/:id` | `CarrService` |
| Carrier — trailers (paginated) | `GET` | `/carr/trailerPage` | `CarrService` |
| Carrier — create trailer | `POST` | `/carr/createTrailer/:id` | `CarrService` |
| Carrier — update trailer | `PUT` | `/carr/updateTrailer` | `CarrService` |
| Carrier — delete trailer | `DELETE` | `/carr/deleteTrailer/:id` | `CarrService` |
| Carrier — drivers (paginated) | `GET` | `/carr/driverPage` | `CarrService` |
| Carrier — create driver | `POST` | `/carr/createDriver/:id` | `CarrService` |
| Carrier — update driver | `PUT` | `/carr/updateDriver` | `CarrService` |
| Carrier — delete driver | `DELETE` | `/carr/deleteDriver/:id` | `CarrService` |
| Carrier — deliveries | `GET` | `/manu/deliveryAll/:id` | `CarrService` |
| Manufacturer — profile | `GET` | `/manu/getManufacturer/:id` | `ManuService` |
| Manufacturer — cargo | `GET` | `/manu/cargoAll/:id` | `ManuService` |
| Manufacturer — deliveries | `GET` | `/manu/deliveryAll/:id` | `ManuService` |
| Manufacturer — trucks (paginated) | `GET` | `/manu/truckPage` | `ManuService` |
| Manufacturer — trailers (paginated) | `GET` | `/manu/trailerPage` | `ManuService` |
| Manufacturer — drivers | `GET` | `/manu/driverAll` | `ManuService` |

Backend repository: [zaricu22/ForwardingAgentBackendSpring](https://github.com/zaricu22/ForwardingAgentBackendSpring)

---

## Roles

| Role | Access |
|---|---|
| `Carrier` | `/carrier/**` — fleet and delivery management |
| `Manufacturer` | `/manufacturer/**` — delivery creation and vehicle browsing |

Route protection is enforced by `AuthGuard` which also checks the required `role` from route `data`.

---

## Environment Variables

Compile-time environment files in `src/environments/`.

| Variable | Dev | Prod |
|---|---|---|
| `apiUrl` | `http://localhost:8080` | `https://forwarding-agent-service.onrender.com` |

---

## Folder Structure

```
src/app/
├── components/
│   ├── landing/              # Public landing page (/home)
│   ├── user/
│   │   ├── login/            # Login (/login)
│   │   └── register/         # Register (/register)
│   ├── carrier/              # Carrier role (canActivate: AuthGuard, role: Carrier)
│   │   ├── carrier/          # Dashboard (/carrier)
│   │   ├── driver/           # Driver list (/carrier/driver)
│   │   ├── jobs/             # Available jobs (/carrier/driver/jobs)
│   │   ├── truck/            # Truck fleet (/carrier/truck)
│   │   ├── trailer/          # Trailer fleet (/carrier/trailer)
│   │   └── show-delivery/    # Delivery tracking (/carrier/show-delivery)
│   └── manufacturer/         # Manufacturer role (canActivate: AuthGuard, role: Manufacturer)
│       ├── manufacturer/     # Dashboard (/manufacturer)
│       ├── create-delivery/  # New delivery order (/manufacturer/create-delivery)
│       ├── show-truck/       # Available trucks (/manufacturer/show-truck)
│       └── show-trailer/     # Available trailers (/manufacturer/show-trailer)
├── enums/
│   └── role.enum.ts          # Role.Carrier, Role.Manufacturer
├── guards/
│   └── auth.guard.ts         # Role-based route protection
└── services/                 # HTTP services per entity
```
