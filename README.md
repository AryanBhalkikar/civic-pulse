# CivicPulse

CivicPulse is a web application that enables citizens to report public hazards such as potholes, open manholes, blocked roads, and broken streetlights, and automatically routes those reports to the appropriate authority via email.

## Overview

The project is built as a React single-page application with an Express backend and PostgreSQL database. It uses PostGIS for geospatial queries, Passport for authentication, and BullMQ with Redis for asynchronous workflows such as email escalation.

## Features

- User signup and login with session-based authentication.
- Report civic issues with title, description, location, and photo support planned.
- Visual issue browsing on an interactive map.
- Duplicate issue clubbing using spatial queries.
- Ward and zone-based authority mapping.
- Asynchronous email drafting and delivery workflow.
- Admin approval flow for outbound email escalation.
- Issue resolution voting and duplicate-report prevention.

## Tech Stack

- Frontend: React, React Router, React-Leaflet, Leaflet or Mapbox GL JS.
- Backend: Node.js, Express.
- Authentication: Passport, bcrypt, cookies, sessions.
- Database: PostgreSQL, PostGIS.
- Queueing: Redis, BullMQ.
- Email: Groq API, Nodemailer, SMTP.

## Architecture

The frontend is a React SPA that handles routing and user interaction in the browser. The backend exposes JSON API endpoints through Express and handles authentication, issue processing, geospatial logic, and admin workflows.

PostgreSQL stores users, issues, ward data, resolution votes, and outbound email drafts. PostGIS enables spatial features such as distance-based duplicate detection, point-in-polygon ward lookup, and map rendering data.

Time-consuming tasks such as email generation and delivery are processed asynchronously using BullMQ and Redis. This keeps the user interface responsive while heavy backend work runs in the background.

## Project Structure

```text
frontend/   React application
backend/    Express server, routes, controllers, config, and workers
```

## Key Modules

- `config/db.js`: PostgreSQL connection pool.
- `issueController.js`: Issue submission, clubbing, and rate limiting logic.
- `wardEscalationProducer.js`: Pushes escalation jobs to the queue.
- `wardEscalationWorker.js`: Builds email drafts using issue and ward data.
- `emailDeliveryWorker.js`: Sends approved emails through SMTP.
- `emailsApprove.js` and `emailsReject.js`: Admin approval flow.
- `ProtectedRoute`: Frontend route protection for authenticated pages.

## Database Highlights

### Users
Stores user profiles, authentication details, and admin status.

### Issues
Uses separate tables for clubbed display data and individual submissions.

### Resolutions
Tracks unique issue-resolution votes and marks issues resolved after reaching the vote threshold.

### Wards and Contacts
Maps Bengaluru wards to zone officer contact details for escalation.

### Outbound Drafts
Stores generated email drafts before admin approval and delivery.

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

## Current Status

The MVP covers authentication, issue reporting, interactive map display, duplicate issue clubbing, ward-based escalation, and admin-controlled email approval. Planned additions include photo uploads, Gmail OAuth, mobile support, analytics dashboards, and social automation.