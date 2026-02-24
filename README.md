# Personal Blog

A full-stack blog application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Single-User Authentication System**: Designed for personal blogs with secure author authentication
- CRUD operations for blog posts
- File upload functionality
- Responsive design
- TypeScript for type safety

## Architecture

This blog implements a **single-user authentication system** specifically designed for personal blogs and content management. The system authenticates against a single author account, providing secure access to administrative features while maintaining simplicity.

### Authentication Features

- Login using either email or username
- Secure password hashing with bcrypt
- JWT-based session management
- Single author account for simplicity and security

## Tech Stack

### Backend
- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- JWT authentication & bcrypt password hashing
- Multer for file uploads

### Frontend
- React 19 with TypeScript
- Vite for development and building
- TailwindCSS for styling
- React Router for navigation
- CKEditor 5 for rich text editing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Azizham66/Personal-Blog.git
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables

**a. Copy the example environment file:**
```bash
cd server
cp .env.example .env
```

**b. Generate a secure password hash:**
```bash
# Copy the example hash script
cp server/src/scripts/hash-password.example.ts server/src/scripts/hash-password.ts

# Edit the script with your password
nano server/src/scripts/hash-password.ts

# Generate the hash
cd server
npx ts-node src/scripts/hash-password.ts
```

**c. Configure your environment variables:**
Edit `server/.env` and replace the placeholder values with your actual configuration.

4. Build and run the application
```bash
# Start the server (from server directory)
cd server
npm run build
npm run serve

# Start the client (from client directory)
cd ../client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Frontend

The frontend is a React 19 application built with TypeScript and Vite. It provides a clean, responsive interface for the blog with the following features:

### Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Rich Text Editing**: CKEditor 5 for creating and editing blog posts
- **Client-side Routing**: React Router for seamless navigation
- **Type Safety**: Full TypeScript support throughout the application
- **Modern Development**: Hot module replacement with Vite

### Frontend Structure
```
client/
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── public/           # Static assets
└── dist/            # Build output
```

### Frontend Development

**Start development server:**
```bash
cd client
npm run dev
```

**Build for production:**
```bash
cd client
npm run build
```

**Run tests:**
```bash
cd client
npm test
```

### Environment Variables (Frontend)

The client uses minimal environment variables. Copy `client/.env.example` to `client/.env` if needed:
```bash
cd client
cp .env.example .env
```

## Environment Variables

The server uses the following environment variables:

### Server Configuration
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `CLIENT_ORIGIN`: Frontend URL for CORS
- `SERVER_URL`: Public server URL for file uploads

### Single-User Authentication
- `AUTHOR_EMAIL`: Author's email address
- `AUTHOR_USERNAME`: Author's username
- `AUTHOR_PASSWORD_HASH`: Hashed password (use the hash script to generate)

## Security

### Password Hash Generation

**⚠️ IMPORTANT**: Never store plain text passwords. Always use the provided hash script to generate secure password hashes.

1. **Create your password hash:**
   ```bash
   # Copy the example script
   cp server/src/scripts/hash-password.example.ts server/src/scripts/hash-password.ts
   
   # Edit the script with your desired password
   nano server/src/scripts/hash-password.ts
   
   # Generate the hash
   cd server
   npx ts-node src/scripts/hash-password.ts
   ```

2. **Copy the generated hash** to your `.env` file's `AUTHOR_PASSWORD_HASH` variable.

3. **Security Best Practices:**
   - Never commit `.env` files to version control
   - Use strong, unique passwords
   - Generate a secure JWT secret (minimum 32 characters)
   - Keep your hash script secure or delete it after use



## API Endpoints

### Authentication (Single-User System)
- `POST /api/auth/login` - Author login (email or username)
- `POST /api/auth/logout` - Author logout
- `GET /api/auth/verify` - Verify JWT token

### Blog Posts
- `GET /api/posts` - Get all posts (public)
- `GET /api/posts/:id` - Get single post (public)
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

### File Uploads
- `POST /api/upload` - Upload image/file (auth required)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under a custom license - see the [LICENSE](LICENSE) file for details.
