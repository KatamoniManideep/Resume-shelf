# ResumeShelf

ResumeShelf is a premium Resume Vault SaaS application where users can upload, organize, and manage multiple resumes by job roles. It is built with a modern tech stack and designed with a sleek, dark-themed UI.

## Features
- **User Authentication**: Secure JWT-based registration and login.
- **Resume Management**: Upload, view, and delete tailored resumes (PDF/DOCX).
- **Direct Cloud Uploads**: Files are securely uploaded directly to Cloudinary using streaming.
- **Search & Filter**: Instantly search by title, role, or tags, and sort by date or alphabetically.
- **Premium Design**: Responsive, dark-themed dashboard inspired by Vercel and Linear.

## Tech Stack
- **Frontend**: React.js (Vite), TypeScript, Tailwind CSS, React Router, Axios.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: MongoDB (Mongoose).
- **Storage**: Cloudinary (via Multer memory storage).

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Cloudinary Account Credentials

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd ResumeShelf
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory and add your credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the App
Open your browser and navigate to `http://localhost:5173`.
