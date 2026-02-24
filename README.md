# Personal Blog

A full-stack blog application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for blog posts
- File upload functionality
- Responsive design
- TypeScript for type safety

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads

### Frontend
- [To be specified]

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Azizham66/Personal-Blog.git
```

2. Install dependencies
```bash
cd server
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Build and run the server
```bash
npm run build
npm run serve
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under a custom license - see the [LICENSE](LICENSE) file for details.
