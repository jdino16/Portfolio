# Dinoja Jeyamelanews Portfolio

A modern, responsive portfolio website with contact form functionality.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 📧 Contact form with email notifications
- 🗄️ MySQL database integration
- 🚀 Ready for Vercel deployment

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your database and email settings
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser:
   ```
   http://localhost:3000
   ```

## Vercel Deployment

This project is configured for easy deployment on Vercel.

### Prerequisites

- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub account
- Database service (PlanetScale, Railway, or similar)

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

### Environment Variables for Vercel

Set these in your Vercel dashboard:

- `DATABASE_URL` - Your production database connection string
- `EMAIL_USER` - Your email address
- `EMAIL_PASS` - Your email app password

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Email:** Nodemailer
- **Deployment:** Vercel

## License

MIT License
