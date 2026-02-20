# 🚀 GitHub Push Guide

Complete guide to push TradeSim Pro to GitHub.

## Step 1: Clean Project
```bash
# Run cleanup script
cleanup.bat

# Or manually remove:
# - tradesim-api/tradesim-api/target/
# - tradesim-frontend/node_modules/
# - tradesim-frontend/dist/
# - All .log, .tmp files
```

## Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `tradesim-pro`
3. Description: `Professional Stock Trading Simulator - Spring Boot + React`
4. Choose: Public or Private
5. **DO NOT** initialize with README (we have one)
6. Click "Create repository"

## Step 3: Initialize Git
```bash
cd "d:\c++ codeing'\python\myproject1\tradesim-api"

# Initialize git
git init

# Add all files
git add .

# Check what will be committed
git status

# First commit
git commit -m "Initial commit: TradeSim Pro - Complete Trading Platform

Features:
- Real-time stock trading with 16 Indian stocks
- Portfolio management with P&L tracking
- Price alerts and notifications
- Trading tournaments and leaderboards
- Portfolio heatmap visualization
- Performance analytics dashboard
- Professional Groww-inspired UI
- Complete REST API with 30+ endpoints
- JWT authentication and security
- Production-ready with Docker support"
```

## Step 4: Connect to GitHub
```bash
# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/tradesim-pro.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main

# If main branch doesn't exist, try:
git branch -M main
git push -u origin main
```

## Step 5: Verify Upload
1. Go to your GitHub repository
2. Check all files are uploaded
3. Verify README.md displays correctly
4. Check .gitignore is working (no node_modules, target folders)

## Step 6: Add Repository Details

### About Section
```
Professional Stock Trading Simulator built with Spring Boot and React
```

### Topics (Tags)
```
spring-boot, react, trading-simulator, stock-market, portfolio-management,
fintech, java, javascript, postgresql, tailwindcss, jwt-authentication,
rest-api, full-stack, trading-platform, indian-stocks
```

### Website
```
https://tradesim-pro.vercel.app (if deployed)
```

## Step 7: Create Releases

### First Release (v1.0.0)
```bash
git tag -a v1.0.0 -m "TradeSim Pro v1.0.0 - Initial Release

Features:
✅ Complete trading platform
✅ 30+ REST API endpoints
✅ Real-time stock updates
✅ Portfolio analytics
✅ Price alerts
✅ Trading tournaments
✅ Professional UI
✅ Production ready"

git push origin v1.0.0
```

## Step 8: Add GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 25
        uses: actions/setup-java@v3
        with:
          java-version: '25'
          distribution: 'temurin'
      - name: Build with Maven
        run: |
          cd tradesim-api/tradesim-api
          mvn clean package

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Build Frontend
        run: |
          cd tradesim-frontend
          npm install
          npm run build
```

## Step 9: Update Repository Settings

### Branch Protection
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

### Security
1. Enable Dependabot alerts
2. Enable security advisories
3. Add SECURITY.md file

## Step 10: Add Badges to README

Update README.md with actual badges:
```markdown
[![Build Status](https://github.com/yourusername/tradesim-pro/workflows/CI/badge.svg)](https://github.com/yourusername/tradesim-pro/actions)
[![License](https://img.shields.io/github/license/yourusername/tradesim-pro)](LICENSE)
[![Stars](https://img.shields.io/github/stars/yourusername/tradesim-pro)](https://github.com/yourusername/tradesim-pro/stargazers)
[![Forks](https://img.shields.io/github/forks/yourusername/tradesim-pro)](https://github.com/yourusername/tradesim-pro/network)
```

## Common Issues

### Large files rejected
```bash
# Check file sizes
git ls-files -z | xargs -0 du -h | sort -h

# Remove large files
git rm --cached large-file.jar
git commit --amend
```

### Authentication failed
```bash
# Use personal access token instead of password
# Generate at: Settings → Developer settings → Personal access tokens
```

### Push rejected
```bash
# Pull first
git pull origin main --rebase

# Then push
git push origin main
```

## Best Practices

### Commit Messages
```bash
# Good
git commit -m "feat: Add price alert notifications"
git commit -m "fix: Resolve portfolio calculation bug"
git commit -m "docs: Update API documentation"

# Bad
git commit -m "update"
git commit -m "fix bug"
```

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "feat: Add new feature"

# Push feature branch
git push origin feature/new-feature

# Create pull request on GitHub
```

## Post-Push Checklist

- [ ] All files uploaded correctly
- [ ] README.md displays properly
- [ ] .gitignore working (no sensitive files)
- [ ] Repository description added
- [ ] Topics/tags added
- [ ] License file present
- [ ] Documentation complete
- [ ] No sensitive data (passwords, keys)
- [ ] Build badges working
- [ ] Links in README working

## Promote Your Project

### Share On
- LinkedIn
- Twitter/X
- Reddit (r/programming, r/java, r/reactjs)
- Dev.to
- Hashnode
- Product Hunt

### Add to Lists
- Awesome Lists (awesome-spring-boot, awesome-react)
- GitHub Topics
- Dev communities

## Maintenance

### Regular Updates
```bash
# Pull latest changes
git pull origin main

# Make changes
git add .
git commit -m "update: Description"
git push origin main
```

### Version Bumps
```bash
# Update version in pom.xml and package.json
git tag -a v1.1.0 -m "Version 1.1.0"
git push origin v1.1.0
```

## Success! 🎉

Your TradeSim Pro is now on GitHub!

**Repository URL**: https://github.com/yourusername/tradesim-pro

Share it with the world! 🚀
