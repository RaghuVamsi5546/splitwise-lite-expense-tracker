# Splitwise-Lite Expense Tracker

A full-stack web application to manage shared expenses and calculate optimized settlements among a group of people.

## Features

- Add shared expenses
- Select a payer
- Select participants
- Equal expense splitting
- Net balance calculation
- Debt minimization
- Settlement generation
- Responsive UI

## Tech Stack

### Frontend
- React (Vite)
- Axios
- Plain CSS

### Backend
- Node.js
- Express.js

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `POST /expenses`
- `GET /expenses`
- `GET /expenses/settlement`
