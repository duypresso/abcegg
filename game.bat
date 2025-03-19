@echo off
cd /d %~dp0\backend
start "Go Backend" cmd /k "go run main.go"
cd /d %~dp0
start "Frontend" cmd /k "npm install && npm start"
