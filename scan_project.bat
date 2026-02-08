@echo off
setlocal

REM =====================================
REM Wrapper to run PowerShell scanner
REM =====================================

echo Running project scanner (PowerShell)...

REM Always run from this script's folder
cd /d "%~dp0"

REM Execute PowerShell script bypassing policy
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scan_project.ps1"

echo.
echo Scan finished.
pause
