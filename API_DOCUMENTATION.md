# TradeSim Pro API Documentation

Base URL: `http://localhost:8083/api`

## Authentication

All endpoints except `/auth/**` and `/stocks/**` require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "message": "User registered successfully",
  "data": null
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Stocks

### Get All Stocks
```http
GET /stocks

Response: 200 OK
{
  "success": true,
  "message": "Stocks retrieved",
  "data": [
    {
      "id": 1,
      "symbol": "RELIANCE",
      "name": "Reliance Industries",
      "currentPrice": 2450.75,
      "openPrice": 2440.00,
      "highPrice": 2460.50,
      "lowPrice": 2435.25,
      "previousClose": 2445.00,
      "changePercent": 0.23
    }
  ]
}
```

### Get Stock by Symbol
```http
GET /stocks/{symbol}

Response: 200 OK
{
  "success": true,
  "message": "Stock retrieved",
  "data": { ... }
}
```

## Portfolio

### Get Portfolio
```http
GET /portfolio
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Portfolio retrieved",
  "data": {
    "id": 1,
    "totalValue": 1050000.00,
    "cashBalance": 850000.00,
    "investedAmount": 200000.00,
    "totalPnl": 50000.00,
    "dailyPnl": 5000.00,
    "roiPercentage": 5.00
  }
}
```

### Get Positions
```http
GET /portfolio/positions
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Positions retrieved",
  "data": [
    {
      "id": 1,
      "symbol": "RELIANCE",
      "quantity": 10,
      "averagePrice": 2400.00,
      "currentPrice": 2450.75,
      "pnl": 507.50,
      "pnlPercentage": 2.11
    }
  ]
}
```

### Get Performance Metrics
```http
GET /portfolio/performance
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Performance metrics retrieved",
  "data": {
    "totalPnl": 50000.00,
    "totalPnlPercentage": 5.00,
    "winRate": 65.50,
    "totalTrades": 25,
    "winningTrades": 16,
    "losingTrades": 9,
    "avgProfitPerTrade": 2000.00,
    "bestTrade": 15000.00,
    "worstTrade": -5000.00,
    "sharpeRatio": 1.50,
    "currentStreak": 3,
    "streakType": "WIN"
  }
}
```

### Get Portfolio Heatmap
```http
GET /portfolio/heatmap
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Heatmap retrieved",
  "data": {
    "items": [
      {
        "symbol": "RELIANCE",
        "name": "RELIANCE",
        "value": 24507.50,
        "percentage": 12.25,
        "pnl": 507.50,
        "pnlPercentage": 2.11,
        "color": "green"
      }
    ],
    "totalValue": 200000.00
  }
}
```

### Add Funds
```http
POST /portfolio/add-funds?amount=50000
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Funds added successfully",
  "data": { ... }
}
```

### Export Report
```http
GET /portfolio/export
Authorization: Bearer <token>

Response: 200 OK
Content-Type: text/plain
Content-Disposition: attachment; filename=portfolio-report.txt

[Text file with portfolio summary]
```

## Orders

### Place Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "RELIANCE",
  "orderType": "MARKET",
  "side": "BUY",
  "quantity": 10,
  "price": 2450.75
}

Response: 200 OK
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "symbol": "RELIANCE",
    "orderType": "MARKET",
    "side": "BUY",
    "quantity": 10,
    "price": 2450.75,
    "status": "FILLED",
    "createdAt": "2024-02-19T10:30:00"
  }
}
```

### Get Orders
```http
GET /orders
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Orders retrieved",
  "data": [ ... ]
}
```

## Price Alerts

### Create Alert
```http
POST /alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "symbol": "RELIANCE",
  "targetPrice": 2500.00,
  "conditionType": "ABOVE"
}

Response: 200 OK
{
  "success": true,
  "message": "Alert created successfully",
  "data": { ... }
}
```

### Get Alerts
```http
GET /alerts
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Alerts retrieved",
  "data": [ ... ]
}
```

### Delete Alert
```http
DELETE /alerts/{id}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Alert deleted",
  "data": null
}
```

## Tournaments

### Get Active Tournaments
```http
GET /tournaments

Response: 200 OK
{
  "success": true,
  "message": "Tournaments retrieved",
  "data": [
    {
      "id": 1,
      "name": "Weekly Trading Challenge",
      "description": "Compete for ₹50,000 prize pool",
      "startDate": "2024-02-19T00:00:00",
      "endDate": "2024-02-26T23:59:59",
      "prizePool": 50000.00,
      "status": "ACTIVE"
    }
  ]
}
```

### Join Tournament
```http
POST /tournaments/{id}/join
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Joined tournament successfully",
  "data": { ... }
}
```

### Get Tournament Leaderboard
```http
GET /tournaments/{id}/leaderboard

Response: 200 OK
{
  "success": true,
  "message": "Leaderboard retrieved",
  "data": [ ... ]
}
```

## Watchlist

### Get Watchlist
```http
GET /watchlist
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Watchlist retrieved",
  "data": ["RELIANCE", "TCS", "INFY"]
}
```

### Add to Watchlist
```http
POST /watchlist/{symbol}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Added to watchlist",
  "data": null
}
```

### Remove from Watchlist
```http
DELETE /watchlist/{symbol}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Removed from watchlist",
  "data": null
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request parameters",
  "data": null
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials",
  "data": null
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An error occurred: ...",
  "data": null
}
```
