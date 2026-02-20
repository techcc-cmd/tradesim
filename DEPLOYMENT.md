# Deployment Guide

## Prerequisites
- Java 25 JDK
- PostgreSQL 14+
- Node.js 20+
- Docker (optional)

## Local Deployment

### 1. Database Setup
```sql
CREATE DATABASE tradesim;
CREATE USER tradesim_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tradesim TO tradesim_user;
```

### 2. Backend Configuration
Update `tradesim-api/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tradesim
spring.datasource.username=tradesim_user
spring.datasource.password=your_password
jwt.secret=your-secret-key-min-256-bits
```

### 3. Build & Run Backend
```bash
cd tradesim-api/tradesim-api
mvn clean package
java -jar target/tradesim-api-0.0.1-SNAPSHOT.jar
```

### 4. Build & Run Frontend
```bash
cd tradesim-frontend
npm install
npm run build
npm run preview
```

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM openjdk:25-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java","-jar","app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: tradesim
      POSTGRES_USER: tradesim_user
      POSTGRES_PASSWORD: your_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./tradesim-api/tradesim-api
    ports:
      - "8083:8083"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/tradesim
      SPRING_DATASOURCE_USERNAME: tradesim_user
      SPRING_DATASOURCE_PASSWORD: your_password
    depends_on:
      - postgres

  frontend:
    build: ./tradesim-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## Cloud Deployment

### AWS Deployment

#### Backend (Elastic Beanstalk)
1. Package application: `mvn clean package`
2. Create Elastic Beanstalk application
3. Upload JAR file
4. Configure environment variables
5. Set up RDS PostgreSQL instance

#### Frontend (S3 + CloudFront)
1. Build: `npm run build`
2. Create S3 bucket
3. Upload `dist/` contents
4. Enable static website hosting
5. Create CloudFront distribution

### Heroku Deployment

#### Backend
```bash
heroku create tradesim-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### Frontend
```bash
heroku create tradesim-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

### Vercel Deployment (Frontend)
```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

### Backend
```
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/tradesim
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key
SERVER_PORT=8083
```

### Frontend
```
VITE_API_URL=https://api.tradesim.com
```

## Production Checklist

- [ ] Change default passwords
- [ ] Use strong JWT secret (256+ bits)
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure logging (ELK stack)
- [ ] Set up CI/CD pipeline
- [ ] Enable database connection pooling
- [ ] Configure Redis for caching
- [ ] Set up load balancer
- [ ] Enable auto-scaling
- [ ] Configure CDN for frontend
- [ ] Set up error tracking (Sentry)

## Monitoring

### Health Check Endpoints
```
GET /actuator/health
GET /actuator/metrics
GET /actuator/info
```

### Logging
- Application logs: `/var/log/tradesim/`
- Access logs: `/var/log/nginx/`
- Error logs: `/var/log/tradesim/error.log`

## Backup & Recovery

### Database Backup
```bash
pg_dump -U tradesim_user tradesim > backup.sql
```

### Database Restore
```bash
psql -U tradesim_user tradesim < backup.sql
```

## Troubleshooting

### Backend won't start
- Check Java version: `java -version`
- Verify database connection
- Check application.properties
- Review logs: `tail -f logs/spring.log`

### Frontend build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v`
- Verify API URL in .env

### Database connection issues
- Verify PostgreSQL is running
- Check firewall rules
- Verify credentials
- Test connection: `psql -U user -d tradesim`

## Performance Optimization

- Enable database indexing
- Use Redis for caching
- Implement CDN for static assets
- Enable gzip compression
- Optimize database queries
- Use connection pooling
- Implement lazy loading
- Minify frontend assets

## Security Best Practices

- Use HTTPS everywhere
- Implement rate limiting
- Sanitize user inputs
- Use prepared statements
- Enable CORS properly
- Implement CSRF protection
- Use secure headers
- Regular security audits
- Keep dependencies updated
