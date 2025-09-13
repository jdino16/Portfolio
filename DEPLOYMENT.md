# 🚀 Portfolio Deployment Guide

This guide will help you deploy your portfolio to various free hosting platforms.

## 📋 Prerequisites
- GitHub repository: [https://github.com/jdino16/Portfolio](https://github.com/jdino16/Portfolio)
- Node.js project with Express backend
- Contact form with database storage

## 🌟 Recommended Platforms

### 1. Render (Best for Full-Stack Apps)

**Why Render?**
- ✅ Supports Node.js + MySQL/PostgreSQL
- ✅ Free tier with 750 hours/month
- ✅ Automatic GitHub deployments
- ✅ Custom domains + SSL
- ✅ Perfect for your contact form backend

**Deploy Steps:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `portfolio-website`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
7. Click "Create Web Service"

**Database Setup:**
- Use Render's free PostgreSQL
- Or connect external MySQL (like PlanetScale, Railway DB)

### 2. Railway (Great Alternative)

**Why Railway?**
- ✅ $5 monthly credit (usually enough)
- ✅ Built-in database options
- ✅ One-click GitHub deployment

**Deploy Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Portfolio repository
5. Railway auto-detects Node.js and deploys!

### 3. Vercel (Frontend + Serverless)

**Why Vercel?**
- ✅ Excellent for static sites
- ✅ Serverless functions for API
- ✅ Automatic deployments

**Note:** Requires converting backend to serverless functions

### 4. Netlify (Static + Functions)

**Why Netlify?**
- ✅ Built-in form handling
- ✅ Serverless functions
- ✅ Great for contact forms

**Note:** Similar to Vercel, needs backend modification

## 🗄️ Database Options

### Free Database Services:
1. **PlanetScale** - MySQL-compatible, generous free tier
2. **Railway Database** - PostgreSQL, included with Railway
3. **Supabase** - PostgreSQL with real-time features
4. **MongoDB Atlas** - NoSQL, 512MB free

## 🔧 Environment Variables

Set these in your hosting platform:

```env
NODE_ENV=production
PORT=10000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=portfolio_contacts
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📱 Custom Domain Setup

Most platforms offer free custom domains:
- Render: Custom domain in settings
- Railway: Custom domain in project settings
- Vercel: Add domain in project settings
- Netlify: Add domain in site settings

## 🚀 Quick Deploy Commands

### Render:
```bash
# Already configured with render.yaml
# Just connect GitHub repo and deploy!
```

### Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 📊 Monitoring & Analytics

Free monitoring options:
- **Uptime Robot** - Website uptime monitoring
- **Google Analytics** - Website traffic analytics
- **Plausible** - Privacy-focused analytics

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Database credentials protected
- [ ] CORS properly configured
- [ ] Input validation on contact form

## 📞 Support

If you need help with deployment:
1. Check platform documentation
2. Look at deployment logs
3. Test locally first
4. Check environment variables

---

**Happy Deploying! 🎉**

Your portfolio will be live and accessible worldwide!
