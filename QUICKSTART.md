# ⚡ Quick Start Guide

Get TradeSim Pro running in 5 minutes!

## Prerequisites Check
```bash
java -version    # Should be 25+
node -v          # Should be 20+
psql --version   # Should be 14+
```

## Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/tradesim-pro.git
cd tradesim-pro
```

## Step 2: Database Setup (2 minutes)
```bash
# Start PostgreSQL
# Windows: Start PostgreSQL service
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE tradesim;
\q
```

## Step 3: Backend Setup (1 minute)
```bash
cd tradesim-api/tradesim-api

# Update application.properties with your password
# spring.datasource.password=YOUR_PASSWORD

# Run backend
mvn spring-boot:run
```

Backend starts at: http://localhost:8083

## Step 4: Frontend Setup (1 minute)
```bash
# Open new terminal
cd tradesim-frontend

# Install and run
npm install
npm run dev
```

Frontend starts at: http://localhost:5173

## Step 5: Test Application (1 minute)
1. Open http://localhost:5173
2. Click "Register"
3. Create account (username, email, password)
4. Login with credentials
5. Start trading! 🎉

## Default Configuration
- **Backend Port**: 8083
- **Frontend Port**: 5173
- **Database**: tradesim
- **Starting Capital**: ₹10,00,000
- **Stocks**: 16 Indian stocks

## Quick Commands

### Backend
```bash
# Build
mvn clean package

# Run
mvn spring-boot:run

# Test
mvn test
```

### Frontend
```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## Troubleshooting

### Port already in use
```bash
# Backend (8083)
# Windows: netstat -ano | findstr :8083
# Mac/Linux: lsof -i :8083

# Frontend (5173)
# Change port in vite.config.js
```

### Database connection failed
```bash
# Check PostgreSQL is running
# Verify credentials in application.properties
# Test connection: psql -U postgres -d tradesim
```

### Build errors
```bash
# Backend: mvn clean install -U
# Frontend: rm -rf node_modules && npm install
```

## Next Steps
- Read [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## Need Help?
- 📖 Check documentation files
- 🐛 Open GitHub issue
- 💬 Start GitHub discussion

Happy Trading! 🚀
