# Auto Insurance Buying Software

A full-stack auto insurance buying application built using:

- React.js
- Node.js
- Express.js
- PostgreSQL
- Microsoft Foundry AI Chatbot

---

# Features

- Insurance quote form
- Insurance plans display
- AI-powered chatbot assistant
- PostgreSQL database integration
- Responsive user interface

---

# Tech Stack

## Frontend
- React
- Bootstrap
- Axios

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## AI Integration
- Microsoft Foundry

---

# Project Structure

insurance-app/
│
├── client/
│
├── server/
│
└── README.md

---

# Run Frontend

cd client

npm install

npm run dev

---

# Run Backend

cd server

npm install

npm run dev

---

# Database

Database Name:

insurance_db

---

# Future Improvements

- Payment gateway integration
- User authentication
- Real insurance premium calculation
- Claim tracking system

# Folder Structure
insurance-app/
│
├── client/        
│   ├── public/
│   │   │
│   │   ├── images/
│   │   │   ├── car-banner.jpg
│   │   │   ├── logo.png
│   │   │   └── insurance-bg.jpg
│   │   │
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── InsuranceForm.jsx
│   │   │   ├── QuoteCard.jsx
│   │   │   └── Chatbot.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── VehicleEntry.jsx    
│   │   │   ├── Plans.jsx           
│   │   │   ├── EditVehicle.jsx     
│   │   │   ├── InsuranceForm.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── server/
│    │
│    ├── routes/
│    │   ├── aiRoutes.js
│    │   ├── contactRoutes.js
│    │   ├── vehicleRoutes.js
│    │   └── insuranceRoutes.js
│    │
│    ├── controllers/
│    │   ├── aiController.js
│    │   ├── contactController.js
│    │   ├── vehicleController.js
│    │   └── insuranceController.js
│    │
│    ├── data
│    │   └── vehicles.json
│    │
│    ├── db/
│    │    └── db.js
│    │
│    ├──node_modules/
│    │
│    ├── .env
│    ├── index.js
│    ├── package-lock.json
│    └── package.json
│
└── README.md