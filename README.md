# 🛡️ RBAC Dashboard - Role-Based Access Control System

A modern, secure, and animated role-based access control dashboard built with Next.js, MongoDB, and Framer Motion. This application demonstrates enterprise-level authentication, authorization, and user management with a beautiful, responsive UI.

![RBAC Dashboard](https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80)

## ✨ Features

### 🔐 **Security & Authentication**
- JWT-based authentication with secure token management
- Password hashing using bcryptjs
- Role-based access control (Admin, Editor, Viewer)
- Protected routes with middleware validation
- Session persistence across browser refreshes

### 🎨 **Modern UI/UX**
- **Framer Motion animations** throughout the application
- **Lucide React icons** for consistent iconography
- **Unsplash images** for beautiful backgrounds
- Responsive design with mobile-first approach
- Gradient backgrounds and modern color schemes
- Interactive hover effects and micro-animations

### 👥 **Role Management**
- **Admin**: Full system access, user management, system logs
- **Editor**: Content management and analytics access
- **Viewer**: Read-only access to published content

### 📊 **Dashboard Features**
- Real-time statistics and analytics
- Activity logging and monitoring
- Content management system
- User management interface
- System logs and security monitoring

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rbac-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rbac-dashboard
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rbac-dashboard

# JWT Secret (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will create the database automatically

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace the `MONGODB_URI` in your `.env.local` file

### 5. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage Guide

### 🔑 **Authentication**

1. **Login**: Navigate to `/login` and use one of the demo accounts
2. **Register**: Create a new account at `/register` (defaults to Viewer role)
3. **Logout**: Click the logout icon in the sidebar

### 👤 **Demo Accounts**

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | `admin@demo.com` | `test@test.com` | Full system access, user management, logs |
| **Editor** | `editor@demo.com` | `test@test.com` | Content management, analytics |
| **Viewer** | `viewer@demo.com` | `test@test.com` | Read-only access to published content |

### 🏠 **Dashboard Navigation**

#### **Admin Dashboard**
- **Dashboard**: Overview with system statistics
- **User Management**: Create, edit, delete users and manage roles
- **System Logs**: Monitor all system activities and security events
- **Content Management**: Full content CRUD operations

#### **Editor Dashboard**
- **Dashboard**: Content-focused analytics
- **Content Management**: Create, edit, publish content

#### **Viewer Dashboard**
- **Dashboard**: Basic overview
- **View Content**: Browse published content (read-only)

### 📱 **Responsive Design**

The application is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Slide-out navigation menu

## 🛠️ Development

### 📁 **Project Structure**

```
rbac-dashboard/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── users/                # User management endpoints
│   │   ├── content/              # Content management endpoints
│   │   └── logs/                 # System logs endpoints
│   ├── dashboard/                # Dashboard pages
│   │   ├── users/                # User management page
│   │   ├── content/              # Content management page
│   │   ├── logs/                 # System logs page
│   │   └── view/                 # Content viewing page
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   ├── unauthorized/             # Access denied page
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── Layout.jsx                # Main layout component
│   └── ProtectedRoute.jsx        # Route protection component
├── hooks/                        # Custom React hooks
│   └── useAuth.jsx               # Authentication hook
├── lib/                          # Utility libraries
│   ├── auth.js                   # Authentication utilities
│   ├── middleware.js             # API middleware
│   ├── mongodb.js                # Database connection
│   └── logger.js                 # Activity logging
├── scripts/                      # Database scripts
│   └── seed-database.js          # Database seeding script
├── package.json                  # Dependencies and scripts
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

### 🔧 **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run seed         # Seed database with demo data
```

### 🎨 **Customization**

#### **Colors and Themes**
- Edit `app/globals.css` for color variables
- Modify `tailwind.config.js` for theme customization
- Update gradient classes in components

#### **Animations**
- All animations use Framer Motion
- Customize animation variants in components
- Adjust timing and easing in motion configurations

#### **Icons**
- All icons from Lucide React
- Easy to replace or add new icons
- Consistent sizing and styling

## 🔒 Security Features

### 🛡️ **Authentication Security**
- JWT tokens with expiration
- Password hashing with bcryptjs (12 rounds)
- Secure token storage in localStorage
- Automatic token validation on requests

### 🔐 **Authorization**
- Role-based middleware protection
- Route-level access control
- API endpoint protection
- UI component conditional rendering

### 📝 **Activity Logging**
- All user actions logged
- IP address tracking
- Timestamp recording
- Admin-only log access

### 🚨 **Security Best Practices**
- Input validation and sanitization
- SQL injection prevention (MongoDB)
- XSS protection
- CSRF protection via JWT
- Secure headers configuration

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Manual Deployment**

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### **Environment Variables for Production**

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```
## 📚 API Documentation

### **Authentication Endpoints**

#### `POST /api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### `POST /api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### `GET /api/auth/me`
Headers: `Authorization: Bearer <token>`

### **User Management Endpoints**

#### `GET /api/users` (Admin only)
Returns list of all users

#### `PUT /api/users/[id]` (Admin only)
Update user role

#### `DELETE /api/users/[id]` (Admin only)
Delete user account

### **Content Endpoints**

#### `GET /api/content`
Returns content based on user role

#### `POST /api/content` (Admin/Editor)
Create new content

#### `DELETE /api/content/[id]` (Admin/Editor)
Delete content

### **Logs Endpoint**

#### `GET /api/logs` (Admin only)
Returns system activity logs
