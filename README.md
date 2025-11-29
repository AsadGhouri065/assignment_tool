# Traffic Event Annotation Tool

A full-stack web application for annotating and verifying traffic violation events. This tool provides a streamlined workflow for reviewing traffic videos, verifying license plates, and checking DMV records before accepting or rejecting traffic events.

## 🎯 Features

- **User Authentication**: Secure login system for authorized users
- **Multi-Step Annotation Workflow**:
  1. **Video Review**: Watch traffic violation videos and validate events
  2. **License Plate Verification**: Verify license plate images are clear and readable
  3. **DMV Verification**: Look up vehicle details from DMV database and verify information
- **Issue Tracking**: Categorize rejection reasons (False Positive, Camera Issues, License Plate Issues, DMV Information Issues)
- **Event Management**: Track pending, accepted, and rejected events
- **Modern UI**: Clean, responsive interface built with React and Bootstrap

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Bootstrap 5.3.8** - CSS framework
- **React Bootstrap 2.10.10** - React components
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB** - Database (via Mongoose 7.6.3)
- **bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### Infrastructure
- **Docker Compose** - Container orchestration
- **MongoDB** - Database container
- **Mongo Express** - MongoDB admin UI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for database)
- [MongoDB](https://www.mongodb.com/) (if not using Docker)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AsadGhouri065/assignment_tool.git
cd assignment_tool
```

### 2. Set Up the Database

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

This will start:
- MongoDB on port `27017`
- Mongo Express UI on port `8081` (login: `admin` / `ui_password`)

#### Option B: Local MongoDB Installation

Ensure MongoDB is running locally on port `27017`, or update the connection string in `server/index.js`.

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/annotation_tool
```

### 4. Install Dependencies

#### Install Server Dependencies

```bash
cd server
npm install
```

#### Install Client Dependencies

```bash
cd ../client
npm install
```

### 5. Seed the Database (Optional)

To populate the database with sample data:

```bash
cd server
npm run seed        # Seed events
npm run seed-users  # Seed users
```

### 6. Start the Application

#### Start the Server

```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

#### Start the Client (in a new terminal)

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` (or another port if 5173 is busy)

## 📁 Project Structure

```
assignment_tool/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.jsx
│   │   │   ├── AnnotationTool.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── PlateDisplay.jsx
│   │   │   ├── DmvPanel.jsx
│   │   │   └── ActionPanel.jsx
│   │   ├── services/       # API services
│   │   │   └── backend-apis.js
│   │   └── App.jsx         # Main app component
│   └── package.json
├── server/                 # Backend Express application
│   ├── models/             # MongoDB models
│   │   ├── User.js
│   │   └── Event.js
│   ├── routes/             # API routes
│   │   ├── routes.js
│   │   ├── user-api.js
│   │   ├── event-api.js
│   │   └── dmv-api.js
│   ├── public/             # Static files
│   │   ├── videos/         # Traffic violation videos
│   │   └── plates/         # License plate images
│   └── index.js            # Server entry point
├── docker-compose.yml      # Docker configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/login` - User login

### Events
- `GET /api/events/next` - Get next pending event

### DMV
- `POST /api/dmv/lookup` - Lookup vehicle information by plate number

## 🔐 Default Users

After running `npm run seed-users` in the server directory, you can log in with:

- **Admin User**
  - Username: `admin`
  - Password: `admin`
  
- **Annotator 1**
  - Username: `annotator1`
  - Password: `password123`
  
- **Annotator 2**
  - Username: `annotator2`
  - Password: `password123`

## 🎬 Usage

1. **Login**: Access the application and log in with your credentials
2. **Review Video**: Watch the traffic violation video in Step 1
3. **Verify Plate**: Check the license plate image clarity in Step 2
4. **DMV Lookup**: Enter the plate number and verify vehicle details in Step 3
5. **Accept/Reject**: Make your decision based on the review

### Rejection Reasons
- False Positive Event
- Main Camera Issue
- License Plate Issue
- DMV Information Issue

## 🧪 Development

### Running in Development Mode

**Server:**
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

**Client:**
```bash
cd client
npm run dev  # Vite dev server with hot reload
```

### Building for Production

**Client:**
```bash
cd client
npm run build
```

The built files will be in the `client/dist` directory.

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f mongodb

# Access MongoDB shell
docker exec -it annotation-mongodb mongosh
```

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/annotation_tool
```

### Docker Compose
- MongoDB: `admin` / `mongodb_password`
- Mongo Express: `admin` / `ui_password`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Asad Ghouri**
- GitHub: [@AsadGhouri065](https://github.com/AsadGhouri065)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Bootstrap for the UI components

