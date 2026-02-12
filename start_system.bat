@echo off
taskkill /IM node.exe /F >nul 2>&1

cd /d %~dp0backend

start "" /B node src/server.js

timeout /t 3 >nul
start "" http://localhost:3000

exit
