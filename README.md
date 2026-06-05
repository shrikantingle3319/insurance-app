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
```text
insurance-app/
│
├── client/
│   ├── node_modules/   
│   │     
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
│   │   │   └── Chatbot.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BuyPolicy.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── InsuranceForm.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Plans.jsx  
│   │   │   ├── PolicyDetails.jsx     
│   │   │   └── Quote.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── apisetuSevrice.js
│   │   │   ├── firebase.js
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│    │
│    ├── controllers/
│    │   ├── aiController.js
│    │   ├── aiPlansController.js
│    │   ├── contactController.js
│    │   └── policyController.js
│    │
│    ├── db/
│    │    ├── validationLogQueries.js
│    │    ├── vehicleQueries.js
│    │    └── db.js
│    │
│    ├──node_modules/
│    │
│    ├── routes/
│    │   ├── aiRoutes.js
│    │   ├── aiPlansRoutes.js
│    │   ├── contactRoutes.js
│    │   ├── policyRoutes.js
│    │   └── quoteRoutes.js
│    │
│    ├── .env
│    ├── index.js
│    ├── package-lock.json
│    └── package.json
│
├── .gitignore
└── README.md
```


```text
Quote.jsx
   ↓
Axios POST
   ↓
aiPlansController.js
   ↓
insuranceGraph.invoke()
   ↓
Validation Node
   ↓
Conditional Logic
   ↓
Ownership Question Node
   ↓
Insurance Node
   ↓
Plans.jsx
   ↓
Final Response
```