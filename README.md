# 🤖 Automated Ops Assistant (https://ops-assistant-app.onrender.com/)

**A Tiered-Intelligence Triage & Reporting Engine**

This project is a high-performance support triage system designed to demonstrate advanced systems engineering, modular architecture, and the strategic integration of LLMs. It shifts focus from a "flashy UI" to a robust, scalable backend that prioritizes reliability, observability, and data integrity.

---

## 🏗️ The Architecture
The system utilizes a **Hybrid Triage Strategy** to optimize for both cost and speed:
1.  **Level 1: Deterministic (Knowledge Base)** – High-speed, zero-cost lookups using a local PostgreSQL "Response Template" library.
2.  **Level 2: Reasoning (Gemini 2.5 AI)** – A "burst" fallback for novel, unstructured queries, utilizing a strict JSON schema for structured classification.

### Key Engineering Choices
* **PostgreSQL (Neon):** Relational algebra for efficient operational reporting and anomaly detection.
* **UUID-OSSP:** Native database-level UUID generation for global data integrity.
* **Observability:** Structured logging via **Winston** and request tracking via **Morgan**.
* **MVC Pattern:** Clean separation of concerns ensuring the engine is modular and extensible.

---

## 🚀 API Documentation & Endpoints

API URL: (https://ops-assistant-app.onrender.com/)

### **Ticket Management**
* `POST /tickets` – Create and automatically triage a ticket.
* `GET /tickets` – List all tickets.
* `GET /tickets/:id` – Detailed view of a specific ticket and its triage results.

### **Knowledge Base (Admin)**
* `POST /kb` – Add/Update patterns (Upsert logic).

### **Reporting (BI)**
* `GET /reports` – Real-time Daily Summary with Anomaly Detection.

---

## 🌐 Live API

**Test the API endpoints live:** [https://ops-assistant-app.onrender.com/]

---

## 💻 Local Setup Instructions

Follow these steps to get the Ops Assistant running in your local environment.

### 1. Prerequisites
* **Node.js** (v18+)
* **PostgreSQL** (Local instance or Neon.tech)
* **Google Gemini API Key**

### 2. Clone the Repository
```bash
git clone (https://github.com/jaure-94/ops-assistant-app.git)
cd ops-assistant-app
3. Install Dependencies

Bash:
npm install

4. Environment Variables
Create a .env file in the root directory and add the following:

PORT=3000
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_google_ai_key

5. Initialize the Database
Run the build script to compile TypeScript and synchronize your models:

Bash:
npm run build
# The application uses Sequelize sync to initialize tables automatically
6. Start the Server

Bash:
npm run start
The API will be live at http://localhost:3000.

🧪 Testing the Triage Engine
You can test the system immediately using curl:

Test KB Match (Instant):

Bash:
curl -X POST http://localhost:3000/kb \
     -H "Content-Type: application/json" \
     -d '{"pattern":"wifi", "category":"IT", "priority":"High", "suggested_response":"Connect to Office_Guest SSID."}'
Test AI Triage (Novel Issue):

Bash:
curl -X POST http://localhost:3000/tickets \
     -H "Content-Type: application/json" \
     -d '{"title":"The coffee machine is leaking", "description":"Water everywhere in the breakroom.", "user":"tj@consultancy.co.zw"}'


🛠 Tech Stack
Language: TypeScript

Backend: Node.js / Express

ORM: Sequelize

Database: PostgreSQL (Neon)

AI Engine: Gemini 2.5 Flash

Logging: Winston