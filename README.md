# Todo Application with Monitoring via Prometheus and Grafana

A comprehensive Todo application featuring real-time backend monitoring utilizing Prometheus and Grafana.

---

## Technology Stack

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB (utilising Docker)
- Monitoring: Prometheus + Grafana
- Containerization: Docker & Docker Compose

---

## Features

- Ability to add, view, and remove todos
- Data is retained in MongoDB
- Metrics endpoint (`/metrics`) made available by the backend using `prom-client`
- Real-time tracking of memory usage and request counts with Prometheus and Grafana

---

## Project Structure

todo-app/
├── backend/ # Express API and Prometheus metrics
├── frontend/ # React application
├── docker-compose.yml # Container specifications
├── prometheus.yml # Prometheus scraping configuration
└── README.md # You are currently here!

---

## Instructions for Running

1. Clone the repository

```bash
git clone https://github.com/williammolina489/todo-app
cd todo-app
```
2. Start the application using Docker Compose

```bash
docker compose up --build
```
3. Access the services:

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/todos

Prometheus: http://localhost:9090

Grafana: http://localhost:3001

Grafana Dashboard
Preconfigured to display:

Backend memory usage (process_resident_memory_bytes)

HTTP request count (http_requests_total)

API Endpoints
Method	Endpoint	Description
GET	/api/todos	Retrieve all todos
POST	/api/todos	Add a new todo
DELETE	/api/todos/:id	Remove a specific todo
GET	/metrics	Prometheus metrics

Notes
Ensure that Docker is operational.

Default ports may be modified in docker-compose.yml.

