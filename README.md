# 📈 TradeSim Pro - Professional Stock Trading Simulator

[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack, production-ready stock trading simulator with real-time market data, portfolio management, and competitive trading features. Built with Spring Boot and React.

![TradeSim Pro](https://via.placeholder.com/800x400/10b981/ffffff?text=TradeSim+Pro)

## ✨ Features

### 🎯 Core Trading
- **Real-time Stock Trading** - Buy/sell Indian stocks with live price updates
- **Portfolio Management** - Track investments, P&L, and performance metrics
- **Order Management** - Market orders with instant execution
- **Position Tracking** - Monitor holdings with real-time valuations

### 📊 Analytics & Insights
- **Performance Dashboard** - Win rate, streaks, best/worst trades
- **Portfolio Heatmap** - Visual representation of holdings
- **Risk Score Analysis** - Portfolio risk assessment
- **Export Reports** - Download portfolio summaries

### 🔔 Smart Features
- **Price Alerts** - Get notified when stocks hit target prices
- **Watchlist** - Track favorite stocks
- **Leaderboard** - Compete with top traders
- **Achievements** - Unlock badges for milestones

### 🏆 Unique Features
- **Trading Tournaments** - Weekly competitions with prize pools
- **Real-time Notifications** - Toast alerts for all actions
- **Advanced Charts** - Multiple timeframes (1D, 1W, 1M)
- **Market Depth** - Order book visualization

## 🚀 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.2
- **Language**: Java 25
- **Database**: PostgreSQL
- **Security**: JWT Authentication
- **Caching**: Redis
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19.2.0
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📁 Project Structure

```
tradesim-api/
├── tradesim-api/                 # Backend (Spring Boot)
│   ├── src/main/java/com/tradesim/
│   │   ├── auth/                 # Authentication & JWT
│   │   ├── trading/              # Trading logic
│   │   │   ├── entity/           # JPA entities
│   │   │   ├── repository/       # Data access
│   │   │   ├── service/          # Business logic
│   │   │   ├── controller/       # REST APIs
│   │   │   └── dto/              # Data transfer objects
│   │   ├── gamification/         # Leaderboard & achievements
│   │   ├── config/               # Configuration
│   │   └── exception/            # Error handling
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── tradesim-frontend/            # Frontend (React)
    ├── src/
    │   ├── App.jsx               # Main application
    │   └── main.jsx              # Entry point
    ├── package.json
    └── vite.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Java 25 or higher
- Node.js 20+ and npm
- PostgreSQL 14+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/tradesim-pro.git
cd tradesim-pro
```

### 2. Database Setup
```sql
-- Create database
CREATE DATABASE tradesim;

-- Create user (optional)
CREATE USER tradesim_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tradesim TO tradesim_user;
```

### 3. Environment Configuration
```bash
# Copy environment template
cp tradesim-api/tradesim-api/.env.example tradesim-api/tradesim-api/.env

# Edit .env file with your credentials
# DB_PASSWORD=your_database_password
# JWT_SECRET=your-secure-jwt-secret-key-min-256-bits
```

**Important**: Never commit `.env` file to version control!

### 3. Backend Setup
```bash
cd tradesim-api/tradesim-api

# Set environment variables (or use .env file)
export DB_PASSWORD=your_password
export JWT_SECRET=your-secret-key

# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

Backend will start on `http://localhost:8083`

### 4. Frontend Setup
```bash
cd tradesim-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🎮 Usage

### 1. Register Account
- Navigate to `http://localhost:5173`
- Click "Register" and create account
- Start with ₹10,00,000 virtual capital

### 2. Start Trading
- Browse 16 Indian stocks (RELIANCE, TCS, INFY, etc.)
- Click stock to view chart and details
- Use BUY/SELL buttons to trade
- Track portfolio in real-time

### 3. Set Price Alerts
- Go to "Alerts" tab
- Create alerts for target prices
- Get notified when conditions are met

### 4. View Analytics
- Check "Performance" tab for metrics
- View "Heatmap" for visual portfolio
- Export reports for analysis

### 5. Join Tournaments
- Browse "Tournaments" tab
- Join active competitions
- Compete for prizes and rankings

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### Trading
```
GET    /api/stocks           - Get all stocks
GET    /api/stocks/{symbol}  - Get stock details
POST   /api/orders           - Place order
GET    /api/orders           - Get user orders
```

### Portfolio
```
GET    /api/portfolio                - Get portfolio
GET    /api/portfolio/positions      - Get positions
GET    /api/portfolio/performance    - Get metrics
GET    /api/portfolio/heatmap        - Get heatmap
GET    /api/portfolio/export         - Export report
POST   /api/portfolio/add-funds      - Add funds
```

### Alerts & Tournaments
```
GET    /api/alerts           - Get alerts
POST   /api/alerts           - Create alert
DELETE /api/alerts/{id}      - Delete alert

GET    /api/tournaments      - Get tournaments
POST   /api/tournaments/{id}/join  - Join tournament
```

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/10b981/ffffff?text=Dashboard)

### Portfolio Heatmap
![Heatmap](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Portfolio+Heatmap)

### Trading Chart
![Chart](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Trading+Chart)

## 🧪 Testing

### Backend Tests
```bash
cd tradesim-api/tradesim-api
mvn test
```

### Frontend Tests
```bash
cd tradesim-frontend
npm test
```

## 📦 Deployment

### Backend (Docker)
```dockerfile
FROM openjdk:25-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- Spring Boot for robust backend framework
- React for modern UI development
- Recharts for beautiful visualizations
- Tailwind CSS for styling
- PostgreSQL for reliable data storage

## 📧 Contact

For questions or support, please open an issue or contact: your.email@example.com

---

⭐ **Star this repo if you find it helpful!** ⭐
