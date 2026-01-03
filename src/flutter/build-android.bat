@echo off
REM VHV Enterprise App - Android Build Script (Windows)
REM Usage: build-android.bat [build-type] [flavor] [mode]
REM Example: build-android.bat apk prod release

setlocal enabledelayedexpansion

echo.
echo ========================================
echo VHV Enterprise App - Android Build
echo ========================================
echo.

REM Default values
set BUILD_TYPE=%1
set FLAVOR=%2
set MODE=%3

if "%BUILD_TYPE%"=="" set BUILD_TYPE=apk
if "%FLAVOR%"=="" set FLAVOR=prod
if "%MODE%"=="" set MODE=release

echo Configuration:
echo   Build Type: %BUILD_TYPE%
echo   Flavor: %FLAVOR%
echo   Mode: %MODE%
echo.

REM Validate inputs
if not "%BUILD_TYPE%"=="apk" if not "%BUILD_TYPE%"=="appbundle" if not "%BUILD_TYPE%"=="aab" (
    echo [ERROR] Invalid build type. Use: apk, appbundle, or aab
    exit /b 1
)

if not "%FLAVOR%"=="dev" if not "%FLAVOR%"=="staging" if not "%FLAVOR%"=="prod" (
    echo [ERROR] Invalid flavor. Use: dev, staging, or prod
    exit /b 1
)

if not "%MODE%"=="debug" if not "%MODE%"=="release" (
    echo [ERROR] Invalid mode. Use: debug or release
    exit /b 1
)

REM Check for keystore in release mode
if "%MODE%"=="release" (
    if not exist "android\key.properties" (
        echo [WARNING] key.properties not found!
        echo Release builds require signing configuration.
        echo Create android\key.properties from android\key.properties.example
        echo.
        set /p CONTINUE="Continue with debug signing? (y/N): "
        if /i not "!CONTINUE!"=="y" exit /b 1
        set MODE=debug
    )
)

REM Clean previous builds
echo.
echo [INFO] Cleaning previous builds...
call flutter clean
if errorlevel 1 (
    echo [ERROR] Clean failed
    exit /b 1
)
echo [SUCCESS] Clean complete
echo.

REM Get dependencies
echo [INFO] Getting dependencies...
call flutter pub get
if errorlevel 1 (
    echo [ERROR] Pub get failed
    exit /b 1
)
echo [SUCCESS] Dependencies ready
echo.

REM Build
echo [INFO] Building %BUILD_TYPE% for %FLAVOR% (%MODE%)...
echo.

if "%BUILD_TYPE%"=="apk" (
    if "%MODE%"=="release" (
        call flutter build apk --%MODE% --flavor %FLAVOR% --split-per-abi
    ) else (
        call flutter build apk --%MODE% --flavor %FLAVOR%
    )
) else if "%BUILD_TYPE%"=="appbundle" (
    if "%MODE%"=="release" (
        call flutter build appbundle --%MODE% --flavor %FLAVOR%
    ) else (
        echo [ERROR] App Bundle only supports release mode
        exit /b 1
    )
) else if "%BUILD_TYPE%"=="aab" (
    if "%MODE%"=="release" (
        call flutter build appbundle --%MODE% --flavor %FLAVOR%
    ) else (
        echo [ERROR] App Bundle only supports release mode
        exit /b 1
    )
)

if errorlevel 1 (
    echo.
    echo [ERROR] Build failed
    exit /b 1
)

echo.
echo [SUCCESS] Build successful!
echo.

REM Show output files
echo Build outputs:
echo.

if "%BUILD_TYPE%"=="apk" (
    set APK_DIR=build\app\outputs\flutter-apk
    
    if "%MODE%"=="release" (
        echo Split APKs:
        dir /b "!APK_DIR!\app-*-%FLAVOR%-release.apk" 2>nul
        echo.
        echo Installation:
        echo   adb install !APK_DIR!\app-arm64-v8a-%FLAVOR%-release.apk
    ) else (
        dir /b "!APK_DIR!\app-%FLAVOR%-debug.apk" 2>nul
        echo.
        echo Installation:
        echo   adb install !APK_DIR!\app-%FLAVOR%-debug.apk
    )
) else (
    set AAB_DIR=build\app\outputs\bundle\%FLAVOR%Release
    
    dir /b "!AAB_DIR!\app-%FLAVOR%-release.aab" 2>nul
    echo.
    echo Ready to upload to Google Play Console
)

echo.
echo [SUCCESS] Done!
echo.

endlocal
