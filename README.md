# MERN Authentication - Codesistency

A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring multi-factor authentication (MFA), email verification, password reset, and more. This project demonstrates secure user management and modern UI/UX best practices.

## Features

- **User Registration & Login**
- **Multi-Factor Authentication (MFA)**
- **Email Verification**
- **Password Reset & Strength Meter**
- **JWT-based Authentication**
- **Profile Picture Upload**
- **Responsive UI with Tailwind CSS**
- **Protected Routes**
- **Modern React Components**

## Project Structure

```
MERN Authentication -Codesistency/
├── back-end/         # Node.js/Express API
│   ├── index.js
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── mailtrap/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── front-end/        # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   ├── public/
│   └── ...
├── client/           # (Optional: legacy or alternate client)
└── package.json      # Project metadata
```

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```powershell
   git clone <repo-url>
   cd "MERN Authentication -Codesistency"
   ```

2. **Install dependencies:**
   - Backend:
     ```powershell
     cd back-end
     npm install
     ```
   - Frontend:
     ```powershell
     cd ../front-end
     npm install
     ```

3. **Configure Environment Variables:**
   - Create `.env` files in `back-end/` and `front-end/` as needed.
   - Example for backend:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_password
     CLIENT_URL=http://localhost:5173
     ```

4. **Start the servers:**
   - Backend:
     ```powershell
     cd back-end
     npm start
     ```
   - Frontend:
     ```powershell
     cd ../front-end
     npm run dev
     ```

## Usage

- Access the frontend at `http://localhost:5173`
- Register a new user, verify email, login, and test MFA features
- Explore dashboard and protected routes

## Key Files & Folders

### Backend
- `index.js` - Entry point
- `controllers/auth.controller.js` - Auth logic
- `models/user.model.js` - User schema
- `middleware/verifyToken.js` - JWT middleware
- `routes/auth.route.js` - Auth routes
- `mailtrap/` - Email templates & config

### Frontend
- `src/components/` - UI components (Navbar, Input, PasswordStrengthMeter, etc.)
- `src/pages/` - Page components (Login, SignUp, Dashboard, etc.)
- `src/store/authStore.js` - Auth state management
- `src/utils/` - Utility functions

## MFA & Security
- MFA implemented using `speakeasy` and `qrcode` (see backend)
- Passwords hashed with bcrypt
- JWT for session management
- Email verification and password reset via secure tokens

## Customization
- Update Tailwind config for custom styles
- Modify email templates in `back-end/mailtrap/emailTemplates.js`
- Add more protected routes/pages as needed

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Credits
- [speakeasy](https://github.com/speakeasyjs/speakeasy) for MFA
- [qrcode](https://github.com/soldair/node-qrcode) for QR code generation
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

For any questions or support, please contact the project maintainer.
