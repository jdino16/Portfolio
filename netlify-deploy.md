# Netlify Deployment Guide

This guide will help you deploy your portfolio to Netlify.

## Method 1: Deploy from GitHub (Recommended)

### Step 1: Connect to GitHub
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify
4. Select your repository: `jdino16/Portfolio`

### Step 2: Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `.` (root directory)
- **Node version**: `18` (or latest)

### Step 3: Set Environment Variables
In Netlify dashboard, go to Site settings → Environment variables and add:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=portfolio_contacts
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Step 4: Deploy
Click "Deploy site" and wait for deployment to complete.

## Method 2: Manual Deploy

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Deploy
```bash
netlify deploy --prod
```

## Method 3: Drag & Drop

1. Zip your project folder (excluding node_modules)
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the zip file to the deploy area

## Important Notes

### Database Setup
- You'll need a cloud database (PlanetScale, Railway, or similar)
- Update the environment variables with your cloud database credentials

### Email Setup
- Use Gmail App Passwords for email functionality
- Enable 2FA on your Gmail account first

### Custom Domain
- After deployment, you can add a custom domain in Netlify settings
- Netlify provides free SSL certificates

## Troubleshooting

### Contact Form Not Working
- Check environment variables are set correctly
- Verify database connection
- Check Netlify function logs

### Build Errors
- Ensure all dependencies are in package.json
- Check Node.js version compatibility

## Support
- Netlify Docs: https://docs.netlify.com/
- Netlify Community: https://community.netlify.com/
