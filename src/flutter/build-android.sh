#!/bin/bash

# VHV Enterprise App - Android Build Script
# Usage: ./build-android.sh [build-type] [flavor]
# Example: ./build-android.sh apk prod

set -e

echo "🚀 VHV Enterprise App - Android Build"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
BUILD_TYPE=${1:-apk}
FLAVOR=${2:-prod}
MODE=${3:-release}

echo -e "${BLUE}Configuration:${NC}"
echo "  Build Type: $BUILD_TYPE"
echo "  Flavor: $FLAVOR"
echo "  Mode: $MODE"
echo ""

# Validate inputs
if [[ ! "$BUILD_TYPE" =~ ^(apk|appbundle|aab)$ ]]; then
    echo -e "${RED}❌ Invalid build type. Use: apk, appbundle, or aab${NC}"
    exit 1
fi

if [[ ! "$FLAVOR" =~ ^(dev|staging|prod)$ ]]; then
    echo -e "${RED}❌ Invalid flavor. Use: dev, staging, or prod${NC}"
    exit 1
fi

if [[ ! "$MODE" =~ ^(debug|release)$ ]]; then
    echo -e "${RED}❌ Invalid mode. Use: debug or release${NC}"
    exit 1
fi

# Check for keystore in release mode
if [ "$MODE" = "release" ] && [ ! -f "android/key.properties" ]; then
    echo -e "${YELLOW}⚠️  Warning: key.properties not found!${NC}"
    echo "Release builds require signing configuration."
    echo "Create android/key.properties from android/key.properties.example"
    echo ""
    read -p "Continue with debug signing? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    MODE="debug"
fi

# Clean previous builds
echo -e "${BLUE}🧹 Cleaning previous builds...${NC}"
flutter clean
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Get dependencies
echo -e "${BLUE}📦 Getting dependencies...${NC}"
flutter pub get
echo -e "${GREEN}✓ Dependencies ready${NC}"
echo ""

# Build
echo -e "${BLUE}🔨 Building $BUILD_TYPE for $FLAVOR ($MODE)...${NC}"
echo ""

START_TIME=$(date +%s)

if [ "$BUILD_TYPE" = "apk" ]; then
    if [ "$MODE" = "release" ]; then
        flutter build apk --$MODE --flavor $FLAVOR --split-per-abi
    else
        flutter build apk --$MODE --flavor $FLAVOR
    fi
elif [ "$BUILD_TYPE" = "appbundle" ] || [ "$BUILD_TYPE" = "aab" ]; then
    if [ "$MODE" = "release" ]; then
        flutter build appbundle --$MODE --flavor $FLAVOR
    else
        echo -e "${RED}❌ App Bundle only supports release mode${NC}"
        exit 1
    fi
fi

END_TIME=$(date +%s)
BUILD_TIME=$((END_TIME - START_TIME))

echo ""
echo -e "${GREEN}✅ Build successful! (${BUILD_TIME}s)${NC}"
echo ""

# Show output files
echo -e "${BLUE}📁 Build outputs:${NC}"
echo ""

if [ "$BUILD_TYPE" = "apk" ]; then
    APK_DIR="build/app/outputs/flutter-apk"
    
    if [ "$MODE" = "release" ] && [ -d "$APK_DIR" ]; then
        echo "Split APKs:"
        ls -lh "$APK_DIR"/app-*-$FLAVOR-release.apk 2>/dev/null | awk '{print "  " $9 " - " $5}'
        
        TOTAL_SIZE=$(du -sh "$APK_DIR" | awk '{print $1}')
        echo ""
        echo "Total size: $TOTAL_SIZE"
    else
        ls -lh "$APK_DIR"/app-$FLAVOR-*.apk 2>/dev/null | awk '{print "  " $9 " - " $5}'
    fi
    
    echo ""
    echo -e "${BLUE}Installation:${NC}"
    if [ "$MODE" = "release" ]; then
        echo "  adb install $APK_DIR/app-arm64-v8a-$FLAVOR-release.apk"
    else
        echo "  adb install $APK_DIR/app-$FLAVOR-debug.apk"
    fi
    
elif [ "$BUILD_TYPE" = "appbundle" ] || [ "$BUILD_TYPE" = "aab" ]; then
    AAB_DIR="build/app/outputs/bundle/${FLAVOR}Release"
    
    if [ -d "$AAB_DIR" ]; then
        ls -lh "$AAB_DIR"/app-$FLAVOR-release.aab | awk '{print "  " $9 " - " $5}'
        echo ""
        echo "Ready to upload to Google Play Console"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Done!${NC}"
