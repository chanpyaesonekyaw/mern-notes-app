# Notes App (MERN Stack)

A full-stack Notes application built using the MERN stack (MongoDB, Express, React, Node.js). This app provides functionalities such as authentication, adding/editing notes, pinning important notes, and searching through notes.

## Features

- **User Authentication**: Login & Sign Up functionality
- **CRUD Operations**: Add, Edit, Delete notes
- **Pin Important Notes**: Keep important notes at the top
- **Search Functionality**: Easily find notes by keyword
- **Responsive UI**: Built using React with a clean and intuitive design

## Screenshots

<img src="/images/sc-1.png" width="300"> <img src="/images/sc-2.png" width="300">  
<img src="/images/sc-3.png" width="300"> <img src="/images/sc-4.png" width="300">  
<img src="/images/sc-5.png" width="300">  

## Tech Stack

### Frontend
- React.js
- React Router
- Axios (for API calls)
- Tailwind CSS (or any styling framework of your choice)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Token (JWT) for authentication
- bcrypt.js for password hashing

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js (latest version)
- MongoDB (local or cloud instance)

### Steps to Run

#### Clone the repository
```sh
git clone https://github.com/chanpyaesonekyaw/mern-notes-app.git
cd mern-notes-app
```

#### Backend Setup
```sh
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
```

Start the backend server:
```sh
npm start
```

#### Frontend Setup
```sh
cd ../frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint                             | Description          |
|--------|--------------------------------------|----------------------|
| POST   | /api/auth/register                   | Register a new user  |
| POST   | /api/auth/login                      | Login user           |
| POST   | /api/auth/get-user                   | Login user           |
| GET    | /api/notes/get-all-notes             | Get all notes        |
| POST   | /api/notes/add-note                  | Create a new note    |
| PUT    | /api/notes/edit-note/:id             | Update a note        |
| PUT    | /api/notes/update-note-pinned/:id    | Update pin a note    |
| DELETE | /api/notes/delete-note/:id           | Delete a note        |
| SEARCH | /api/notes/search-notes              | Search a note        |

## Folder Structure
```
mern-notes-app/
│── backend/         # Express & MongoDB (Node.js backend)
│── frontend/        # React app (frontend UI)
│── images/          # Screenshots & assets
│── .gitignore       # Git ignore file
│── README.md        # Documentation
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## Contact
If you have any questions, feel free to reach out:
- **Email**: chanpyaesonekyaw@gmail.com
- **GitHub**: [chanpyaesonekyaw](https://github.com/chanpyaesonekyaw)
