@echo off
REM Reportify Punch Tracker - Build Script
REM This script builds the Electron application for Windows

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     REPORTIFY PUNCH TRACKER - LOCAL BUILD SCRIPT           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Define paths
set GITHUB_LOCAL=C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub
set OUTPUT_DIR=C:\Users\AbadUmairChanna\Downloads\GitHub
set REPO_NAME=reportify

REM Check if project directory exists
if not exist "%GITHUB_LOCAL%\%REPO_NAME%" (
    echo [ERROR] Project directory not found: %GITHUB_LOCAL%\%REPO_NAME%
    echo [INFO] Please clone the repository first or check the path.
    pause
    exit /b 1
)

cd /d "%GITHUB_LOCAL%\%REPO_NAME%"
echo [OK] Changed directory to: %CD%
echo.

REM Create assets folder
if not exist "assets" mkdir assets
echo [OK] Assets folder ready

REM Check if icon exists, if not create it
if not exist "assets\icon.ico" (
    echo [BUILD] Creating icon from logo...
    if exist "create_icon.py" (
        python create_icon.py
        if %errorlevel% neq 0 (
            echo [WARNING] Icon creation failed, will use default
        )
    ) else (
        echo [WARNING] create_icon.py not found, will use default icon
    )
) else (
    echo [OK] Icon file already exists
)
echo.

REM Check if Node.js is installed
echo [CHECK] Verifying Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo [INFO] Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
echo [CHECK] Verifying npm installation...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo [BUILD] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully
echo.

REM Create output directory if it doesn't exist
if not exist "%OUTPUT_DIR%" (
    echo [CREATE] Creating output directory: %OUTPUT_DIR%
    mkdir "%OUTPUT_DIR%"
)
echo [OK] Output directory: %OUTPUT_DIR%
echo.

REM Build the application
echo [BUILD] Building Electron application...
call npm run build-win
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [OK] Build completed successfully!
echo.

REM Copy built files to output directory
echo [COPY] Copying built files to output directory...
if exist "dist\*.exe" (
    copy /Y "dist\*.exe" "%OUTPUT_DIR%\"
    if %errorlevel% equ 0 (
        echo [OK] EXE files copied to: %OUTPUT_DIR%
    ) else (
        echo [WARNING] Failed to copy some EXE files
    )
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    BUILD COMPLETE!                          ║
echo ║                                                              ║
echo ║  Executable files have been placed in:                      ║
echo ║  %OUTPUT_DIR%                                        ║
echo ║                                                              ║
echo ║  Next steps:                                                ║
echo ║  1. Configure Firebase settings in the app                  ║
echo ║  2. Add your employee information                           ║
echo ║  3. Start punching!                                         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

pause
