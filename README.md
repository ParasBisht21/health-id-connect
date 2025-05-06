
# HealthSync - Medical Records System

HealthSync is a secure medical records system that allows patients to access their health records and hospitals to manage patient information.

## Architecture

This application follows a modern, full-stack architecture:

### Frontend (React + Vite)
- React with TypeScript for type-safe code
- Vite for fast development and optimized builds
- Tailwind CSS for responsive UI
- Shadcn UI components for consistent design
- React Router for navigation
- React Query for data fetching and state management

### Backend (Node.js + Express)
In a production environment, this application would connect to a Node.js and Express backend with:

- RESTful API endpoints for:
  - User authentication and authorization
  - Patient record management
  - Hospital access control
  - Medical report uploads and retrieval

- Authentication flow:
  - JWT-based authentication for secure sessions
  - Role-based access control (RBAC) for patients vs. hospitals
  - OTP verification for enhanced security on hospital logins
  - Health ID generation for unique patient identification

### Database (MongoDB)
MongoDB would be used as the database due to its flexibility with:

- Collections for:
  - Users (patients and hospital staff)
  - Medical records
  - Reports
  - Audit logs for security events

- Database schema would include:
  - Patient profiles with medical history
  - Hospital information
  - Medical reports with metadata
  - Security logs

### Storage (Firebase Storage / AWS S3)
For storing medical reports and images:

- Secure file uploads with access control
- File type and size validation
- Encrypted storage for sensitive documents

### Deployment
The application could be deployed using:

- Frontend: Vercel for React application
- Backend: Render/Heroku for Node.js API or Firebase Functions
- Database: MongoDB Atlas for managed database
- Storage: Firebase Storage or AWS S3

## Current Status

This frontend demo simulates the backend functionality using:

- Mock API calls in `src/services/apiService.ts`
- Simulated JWT-based authentication in `src/utils/authUtils.ts`
- Security logging and encryption utilities in `src/utils/securityUtils.ts`

To convert this to a full production application, the frontend code would remain largely the same, but the mock API calls would be replaced with actual HTTP requests to a real backend API.

## Getting Started with Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Connecting to a Real Backend

To connect this application to a real Node.js + Express backend:

1. Create a Node.js + Express API with the necessary endpoints
2. Configure MongoDB for data storage
3. Set up Firebase Storage or AWS S3 for file storage
4. Update the API service in the frontend to make actual HTTP requests
5. Deploy the backend and frontend separately

## Security Considerations

- All sensitive data should be encrypted at rest and in transit
- JWT tokens should have short expiration times
- OTP verification should be implemented for high-security operations
- Regular security audits should be performed
- HIPAA compliance should be ensured for medical data
