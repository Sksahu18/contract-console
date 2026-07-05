# Contract Operations Console

## 🚀 Overview

The Contract Operations Console is a full-stack web application that enables organisations to manage contracts efficiently. It supports multi-tenant data isolation, structured contract uploads, status workflows, audit tracking, and real-time updates.

This project demonstrates scalable backend design, REST API development, PostgreSQL usage with JSONB, and real-time communication using WebSockets.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* PostgreSQL
* Socket.IO

### Database

* PostgreSQL (JSONB for flexible contract storage)

---

## ✨ Features

### 🔐 Multi-Tenant Support

* All operations scoped via `x-org-id`
* No cross-organisation data leakage

### 📄 Contract Management

* Upload contracts in structured JSON format
* Validation of required fields
* Store dynamic data using JSONB

### 🔄 Status Workflow

* DRAFT → FINALIZED → ARCHIVED
* Invalid transitions rejected with proper error handling

### 🔍 Search & Filtering

* Search by client name (partial match)
* Filter by contract status
* Pagination support (backend-ready)

### 📝 Audit Trail

* Tracks:

  * Create
  * Update
  * Status changes
  * Delete
* View audit history per contract

### ⚡ Real-Time Updates

* WebSocket-based updates
* Status changes reflect across multiple tabs instantly

---

## 📂 Project Structure

```
contract-console/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── services/
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd contract-console
```

---

## 🗄 Backend Setup

### Install dependencies

```bash
cd backend
npm install
```

### Create `.env`

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/contract_db
PORT=5001
```

> ⚠️ Encode special characters in password if needed.

---

### Setup Database

```bash
psql -U postgres
```

```sql
CREATE DATABASE contract_db;
```

Run schema SQL (tables for contracts, organisations, contract_events).

---

### Start Backend

```bash
npm run dev
```

Server runs at:

```
http://localhost:5001
```

---

## 💻 Frontend Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Start frontend

```bash
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🔌 API Usage

### Headers (Required)

```
x-org-id: org-1
```

---

### Create Contract

```
POST /contracts
```

### Get Contracts

```
GET /contracts
```

Query params:

* `search`
* `status`
* `page`
* `limit`

---

### Update Status

```
POST /contracts/:id/status
```

Body:

```json
{
  "status": "FINALIZED"
}
```

---

### Get Contract Details

```
GET /contracts/:id
```

---

### Get Audit Events

```
GET /contracts/:id/events
```

---

## 📦 Sample Contract JSON

```json
{
  "client_name": "ABC Pvt Ltd",
  "po_ref_no": "PO-123",
  "po_date": "2024-01-10",
  "payment_terms": "Net 30",
  "delivery_terms": "FOB",
  "items": [
    {
      "description": "Laptop",
      "quantity": 2,
      "unit_price": 50000
    }
  ]
}
```

---

## 🧪 Demo Instructions

1. Select organisation (Org One / Org Two)
2. Upload contract JSON
3. View contracts list
4. Use search and filter
5. Click contract to view details
6. Update status (Finalize / Archive)
7. Open multiple tabs to see real-time updates

---

## ☁️ Deployment

### Backend

* Deploy on Render / Railway

### Frontend

* Deploy on Vercel

---

## 📌 Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| DATABASE_URL | PostgreSQL connection string |
| PORT         | Backend server port          |

---

## 🎯 Evaluation Highlights

* Clean REST API design
* Multi-tenant data isolation
* JSONB usage in PostgreSQL
* Real-time updates with WebSocket
* Full-stack integration

---

## 📎 Notes

* No authentication implemented (as per assignment scope)
* Org scoping handled via request headers
* Designed for scalability and extensibility

---

## 🙌 Author

**Shailendra Kumar Sahu**
