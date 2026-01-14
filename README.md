# Civic Issue Reporting & Tracking System

A web-based platform that enables citizens to report civic issues and allows authorities to manage and resolve them efficiently.

## Features

### For Citizens
- Report civic issues with photos and live location
- Track issue status in real-time
- View all reported issues publicly
- User authentication and profile management

### For Administrators
- View and manage all reported issues
- Update issue status (Pending → In Progress → Resolved)
- Filter issues by status and category
- Dashboard with statistics

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript** - Client-side logic
- **Geolocation API** - Location capture

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image storage)

### 1. Clone the repository
```bash
git clone <repository-url>
cd civic-issue-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/civic-tracker
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the required collections.

### 5. Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Update the `.env` file with your Cloudinary credentials

### 6. Start the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### 1. Access the Application
- Open `http://localhost:3000` in your browser
- You'll see the public homepage with existing issues

### 2. User Registration
- Click "Sign Up" to create a new account
- Choose role: "Citizen" or "Admin"
- Fill in your details and register

### 3. For Citizens
- Login with your citizen account
- Click "Report New Issue" to report a problem
- Upload an image and get your current location
- Track your reported issues on the dashboard

### 4. For Administrators
- Login with your admin account
- View all reported issues
- Filter by status or category
- Update issue status to manage resolution progress

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Issues
- `POST /api/issues/report` - Report new issue (Citizens)
- `GET /api/issues/public` - Get all issues (Public)
- `GET /api/issues/my-issues` - Get user's issues (Citizens)
- `GET /api/issues/admin/all` - Get all issues (Admin)
- `PATCH /api/issues/:id/status` - Update issue status (Admin)
- `GET /api/issues/:id` - Get issue details

## Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (required),
  role: String (enum: ["citizen", "admin"], required),
  profilePicture: String,
  emailVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Issues Collection
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: ["Road", "Garbage", "Water", "Electricity"], required),
  imageUrl: String (required),
  location: {
    latitude: Number (required),
    longitude: Number (required)
  },
  status: String (enum: ["Pending", "In Progress", "Resolved"], default: "Pending"),
  reportedBy: ObjectId (ref: "User", required),
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure
```
civic-issue-tracker/
├── config/
│   └── cloudinary.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Issue.js
├── public/
│   ├── admin.html
│   ├── admin.js
│   ├── citizen.html
│   ├── citizen.js
│   ├── public.html
│   ├── public.js
│   └── styles.css
├── routes/
│   ├── auth.js
│   └── issues.js
├── .env
├── package.json
├── README.md
└── server.js
```

## Team Members
- **Aayush Sharma** - Role
- **Adolf Nohara** - Role  
- **Hamsini Rapalli** - Role
- **Haneesh** - Role
- **Jaypal** - UI/UX, Backend Developer (Node.js, Express.js, MongoDB, API)
- **Pratik Munde** - Role

## Future Enhancements
- Map-based visualization using Leaflet.js
- Email notifications for status updates
- Mobile app development
- Advanced analytics and reporting
- Multi-language support

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

