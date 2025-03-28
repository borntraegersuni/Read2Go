# Read2Go

## Project Description

Read2Go is a digital reading platform designed to make literature accessible to everyone. The application allows users to discover, manage, and enjoy books in a user-friendly interface. With features like personalized recommendations, reading progress tracking, and a clean, intuitive design, Read2Go aims to enhance the digital reading experience.

## Technologies Used

- **Frontend**: Angular
- **Backend**: NestJS
- **Authentication**: JWT
- **Database**: PostgreSQL with TypeORM

## Installation Guide

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (`npm install -g @angular/cli`)
- NestJS CLI (`npm install -g @nestjs/cli`)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Read2Go.git
cd Read2Go
```

## Step 2: Install Dependencies
### Install Frontend dependencies
```bash
cd Frontend
npm install
```

### Install Backend dependencies
```bash
cd ../Backend
npm install
```

## Step 3: Configure Environment
### Frontend environment
```bash
cd Frontend/src/environments
cp environment.example.ts environment.ts
# Edit environment.ts with appropriate API URL
```

### Backend environment
```bash
cd ../../../Backend
cp .env.example .env
# Edit .env with database credentials and JWT secret
```

## Step 4: Run the Application
### Start Backend server (from Backend directory)
```bash
npm run start
# Backend will be available at http://localhost:3000/
```

### In a new terminal, start Frontend development server
```bash
cd ../Frontend
ng serve
# Frontend will be available at http://localhost:4200/
```

## Step 5: Building for Production
### Build Frontend
```bash
cd Frontend
ng build --configuration production
```

### Build Backend
```bash
cd ../Backend
npm run build
```

## Project Structure
```bash
Read2Go/
├── Frontend/           # Angular frontend application
│   ├── public/         # Static assets like book covers, and icons
│   ├── src/
│   │   ├── app/        # Components, services, and modules
│   │   ├── assets/     # Static assets like fonts
│   │   └── environments/ # Environment configuration files
│   └── ...
├── Backend/            # NestJS backend application
│   ├── src/
│   │   ├── auth/       # Authentication logic
│   │   ├── book/       # Book entity and services
│   │   ├── user/       # User entity and services
│   │   ├── review/     # Review entity and services
│   │   └── ...
│   └── ...
└── ...
```

## Design Notes
The application follows a consistent design language with:
- Modern, clean interface  
- Responsive layout for all device sizes  
- Accessible color scheme and typography  

## Backend Documentation
- Swagger: `http://localhost:3000/api-docs`

## Troubleshooting
- **Database Connection Issues:** Ensure your database credentials in `.env` are correct.  
- **JWT Authentication Issues:** Verify the `JWT_SECRET` is properly set in the backend `.env` file.  
- **Missing Modules:** Run `npm install` in both `Frontend` and `Backend` directories.  
