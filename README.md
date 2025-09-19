# Contact Book App - Demand Xpress Assignment

A modern, full-stack contact management application built with React, Node.js, Express, and SQLite.

## 🚀 Features

- **Contact Management**: Add, view, and delete contacts with validation
- **Pagination**: Efficient browsing of large contact lists
- **Responsive Design**: Optimized for mobile and desktop devices
- **Input Validation**: Client-side and server-side validation
- **Professional UI**: Clean, modern interface with loading states
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **SQLite** database
- **Joi** for validation
- **CORS** and security middleware

## 📁 Project Structure

```
contact-book-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ContactList.tsx
│   │   │   └── Pagination.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useContacts.ts
│   │   ├── services/         # API service layer
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── Contact.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   │   └── contactController.ts
│   │   ├── middleware/       # Express middleware
│   │   │   └── errorHandler.ts
│   │   ├── models/           # Data models
│   │   │   └── Contact.ts
│   │   ├── routes/           # API routes
│   │   │   └── contactRoutes.ts
│   │   ├── utils/            # Utility functions
│   │   │   ├── setupDatabase.ts
│   │   │   └── validation.ts
│   │   └── server.ts
│   ├── database/             # SQLite database (auto-generated)
│   └── package.json
├── package.json              # Root package.json for monorepo
├── .env.sample               # Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install all dependencies (frontend + backend)
   npm run install:all
   ```

2. **Environment Setup**
   ```bash
   # Copy environment templates
   cp .env.sample .env
   cp frontend/.env.sample frontend/.env
   
   # Edit .env files with your configuration
   ```

3. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run dev:frontend    # Frontend on http://localhost:3000
   npm run dev:backend     # Backend on http://localhost:5000
   ```

### Individual Setup

#### Frontend Only
```bash
cd frontend
npm install
npm run dev
```

#### Backend Only
```bash
cd backend
npm install
npm run dev
```

## 📊 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/health` | Health check | - |
| POST | `/contacts` | Create contact | `{name, email, phone}` |
| GET | `/contacts` | Get contacts | `?page=1&limit=10` |
| DELETE | `/contacts/:id` | Delete contact | Contact ID |

### API Response Examples

**Create Contact:**
```json
POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

**Get Contacts:**
```json
GET /api/contacts?page=1&limit=10
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `frontend/dist` folder** to your preferred platform

3. **Update environment variables:**
   - `VITE_API_URL`: Your backend API URL

### Backend (Render/Heroku)

1. **Build the backend:**
   ```bash
   cd backend
   npm run build
   ```

2. **Deploy to your platform** with these settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18+

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.com
   ```

### Database

The SQLite database is automatically created and initialized on first run. No additional setup required!

## ⚡ Performance Features

- **Efficient Pagination**: Server-side pagination for large datasets
- **Database Indexing**: Optimized queries with proper indexes
- **Request Validation**: Input validation on both client and server
- **Error Boundaries**: Comprehensive error handling
- **Loading States**: User-friendly loading indicators
- **Responsive Design**: Mobile-first approach

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/api/contacts

# Create test contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890"}'
```

## 📝 Validation Rules

### Contact Fields
- **Name**: 2-100 characters, required
- **Email**: Valid email format, unique, required
- **Phone**: Exactly 10 digits, required

### Pagination
- **Page**: Minimum 1, default 1
- **Limit**: 1-50 items, default 10

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: API request throttling
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Parameterized queries

## 📈 Scalability

- **Modular Architecture**: Clean separation of concerns
- **Database Indexing**: Optimized for performance
- **Pagination**: Handles large datasets efficiently
- **Error Handling**: Robust error management
- **TypeScript**: Type safety throughout the application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is part of the Demand Xpress assignment.

---

**Built with ❤️ using React, Node.js, and SQLite**