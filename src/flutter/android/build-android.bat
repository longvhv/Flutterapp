@echo off
REM Build script for Android (Windows)
REM Usage: build-android.bat [debug|release|appbundle] [dev|staging|prod]

setlocal

set BUILD_TYPE=%1
set FLAVOR=%2

if "%BUILD_TYPE%"=="" set BUILD_TYPE=release
if "%FLAVOR%"=="" set FLAVOR=prod

echo 🚀 Building Android app...
echo 📦 Build Type: %BUILD_TYPE%
echo 🎨 Flavor: %FLAVOR%
echo.

REM Clean previous builds
echo 🧹 Cleaning previous builds...
call flutter clean
call flutter pub get

REM Build based on type
if "%BUILD_TYPE%"=="debug" (
    echo 🔨 Building debug APK...
    call flutter build apk --debug --flavor %FLAVOR%
    set OUTPUT=build\app\outputs\flutter-apk\app-%FLAVOR%-debug.apk
) else if "%BUILD_TYPE%"=="release" (
    echo 🔨 Building release APK ^(split per ABI^)...
    call flutter build apk --release --split-per-abi --flavor %FLAVOR%
    set OUTPUT=build\app\outputs\flutter-apk\
) else if "%BUILD_TYPE%"=="appbundle" (
    echo 🔨 Building App Bundle...
    call flutter build appbundle --release --flavor %FLAVOR%
    set OUTPUT=build\app\outputs\bundle\%FLAVOR%Release\app-%FLAVOR%-release.aab
) else (
    echo ❌ Invalid build type. Use: debug, release, or appbundle
    exit /b 1
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo 📁 Output: %OUTPUT%
) else (
    echo.
    echo ❌ Build failed!
    exit /b 1
)

endlocal
