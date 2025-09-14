# Dinoja Jeyamalanews Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and contact information.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on all devices (desktop, tablet, mobile)
- **Contact Form**: Functional contact form with backend API
- **Project Showcase**: Display of personal projects and skills
- **Certificate Gallery**: Interactive certificate display
- **Admin Panel**: Backend admin interface for managing contacts

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Modern CSS with Flexbox and Grid
- Responsive design principles
- Smooth animations and transitions

### Backend
- Node.js with Express.js
- MySQL database for contact storage
- Nodemailer for email notifications
- CORS enabled for cross-origin requests

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL/WAMP Server
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/jdino16/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env`
   - Update the database and email credentials

4. **Set up MySQL database**
   - Start your MySQL/WAMP Server
   - The server will automatically create the required database and tables

5. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

6. **Access the website**
   - Main website: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## Project Structure

```
Portfolio/
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   ├── certificates-modern.css
│   │   └── projects-modern.css
│   └── js/
│       └── main.js
├── certificates/
│   └── Dinoja Jeyamalanews.pdf
├── .vscode/
│   ├── tasks.json
│   └── launch.json
├── server.js
├── package.json
├── admin.html
├── index.html
└── README.md
```

## API Endpoints

- `GET /` - Main portfolio website
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `PUT /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact
- `GET /admin` - Admin panel

## Development

### VS Code Setup
The project includes VS Code configuration for easy development:
- Press `F5` to start debugging
- Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Portfolio Server"

### Scripts
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon

## Contact Form

The contact form includes:
- Client-side validation
- Server-side validation
- Database storage
- Email notifications (optional)
- Success/error feedback

## Admin Features

- View all contact submissions
- Update contact status (new, read, replied)
- Delete contacts
- Responsive admin interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- **Name**: Dinoja Jeyamalanews
- **Email**: dinoja21.dr@gmail.com
- **GitHub**: [@jdino16](https://github.com/jdino16)

---

Made with ❤️ by Dinoja Jeyamalanews
