@echo off
cd /d %~dp0

echo Installing dependencies...
call npm install

echo Starting Electron app...
call npm start

pause
