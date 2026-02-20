@echo off
echo ========================================
echo TradeSim Pro - GitHub Cleanup Script
echo ========================================
echo.

echo Cleaning backend...
cd tradesim-api\tradesim-api
if exist target rmdir /s /q target
if exist .mvn rmdir /s /q .mvn
if exist mvnw del /f /q mvnw
if exist mvnw.cmd del /f /q mvnw.cmd
echo Backend cleaned!

echo.
echo Cleaning frontend...
cd ..\..\tradesim-frontend
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
if exist .env del /f /q .env
if exist .env.local del /f /q .env.local
echo Frontend cleaned!

echo.
echo Removing temporary files...
cd ..
del /s /q *.log 2>nul
del /s /q *.tmp 2>nul
del /s /q *.temp 2>nul
del /s /q .DS_Store 2>nul
del /s /q Thumbs.db 2>nul

echo.
echo Removing helper files...
if exist fix_positions.sql del /f /q fix_positions.sql
if exist PerformanceView.txt del /f /q PerformanceView.txt
if exist NewFeatures.txt del /f /q NewFeatures.txt
if exist PROJECT_HEALTH.md del /f /q PROJECT_HEALTH.md

echo.
echo ========================================
echo Cleanup Complete!
echo ========================================
echo.
echo Your project is now clean and ready for GitHub!
echo.
echo Next steps:
echo 1. Review .gitignore file
echo 2. git init
echo 3. git add .
echo 4. git commit -m "Initial commit: TradeSim Pro"
echo 5. git remote add origin YOUR_REPO_URL
echo 6. git push -u origin main
echo.
pause
