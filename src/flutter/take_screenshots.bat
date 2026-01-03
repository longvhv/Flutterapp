@echo off
REM Take screenshots of VHV Enterprise App for Play Store
REM Usage: take_screenshots.bat

setlocal enabledelayedexpansion

echo 📱 VHV Enterprise App - Screenshot Tool
echo ========================================
echo.

REM Create directories
if not exist "screenshots\raw" mkdir screenshots\raw
if not exist "screenshots\framed" mkdir screenshots\framed
if not exist "screenshots\phone\en-US" mkdir screenshots\phone\en-US
if not exist "screenshots\phone\vi-VN" mkdir screenshots\phone\vi-VN

REM Check if device is connected
adb devices | findstr /C:"device" >nul
if errorlevel 1 (
    echo ❌ No device connected!
    echo Please connect an Android device or start an emulator.
    exit /b 1
)

echo ✅ Device connected
echo.

REM Build and run app
echo 🚀 Building and launching app...
start /B flutter run --release --flavor prod

REM Wait for app to launch
echo ⏳ Waiting for app to launch ^(15 seconds^)...
timeout /t 15 /nobreak >nul

echo.
echo 📸 Screenshot Guide
echo ===================
echo.
echo Navigate to each screen and press Enter to capture.
echo Screenshots will be saved to: screenshots\raw\
echo.

REM Take screenshots
set screens=01-login:Login Screen;02-dashboard:Dashboard/Home Screen;03-notifications:Notifications Screen;04-settings:Settings Screen;05-profile:Profile Screen;06-security:Security Settings;07-devices:Device Management;08-help:Help Center

for %%s in (%screens%) do (
    for /f "tokens=1,2 delims=:" %%a in ("%%s") do (
        echo 📌 %%b
        echo    Navigate to this screen, then press Enter...
        pause >nul
        
        adb exec-out screencap -p > "screenshots\raw\%%a.png"
        
        if !errorlevel! equ 0 (
            echo    ✓ Saved %%a.png
        ) else (
            echo    ✗ Failed to capture %%a.png
        )
        
        echo.
    )
)

echo.
echo ✅ Screenshot capture complete!
echo.
echo 📁 Raw screenshots saved to: screenshots\raw\
echo.
echo 🎨 Next Steps:
echo 1. Review screenshots in screenshots\raw\
echo 2. Add device frames at https://appure.io/ or https://shots.so/
echo 3. Save framed screenshots to screenshots\framed\
echo 4. Organize by language in screenshots\phone\[locale]\
echo 5. Upload to Google Play Console
echo.
echo 📊 Screenshot files:
dir /b screenshots\raw\*.png
echo.
echo 🎉 Happy Publishing!

endlocal
