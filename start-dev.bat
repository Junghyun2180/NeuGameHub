@echo off
title NeuGameHub Dev Server

echo ========================================
echo   NeuGameHub Dev Server Starting
echo ========================================
echo.

:: 1) Prisma DB sync
echo [1/4] Syncing DB schema...
call npx prisma db push --skip-generate >nul 2>&1
if errorlevel 1 (
    echo   [!] DB push failed - continuing
) else (
    echo   OK
)

:: 2) Prisma client generate
echo [2/4] Generating Prisma client...
call npx prisma generate >nul 2>&1
if errorlevel 1 (
    echo   [!] Prisma generate failed - DLL lock possible
) else (
    echo   OK
)

:: 3) Start dev server
echo [3/4] Starting dev server (port 7000)...
echo [4/4] Seed data will be injected after server is ready
echo.
echo ----------------------------------------
echo   http://localhost:7000
echo   Admin: admin@neugamehub.com / admin123
echo ----------------------------------------
echo.

:: Background seed call after server starts
start /b cmd /c "timeout /t 8 /nobreak >nul && curl -s -X POST http://localhost:7000/api/seed >nul 2>&1 && echo   [seed] Seed data injected"

call npx next dev -p 7000
