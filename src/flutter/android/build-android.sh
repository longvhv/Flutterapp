#!/bin/bash

# Build script for Android
# Usage: ./build-android.sh [debug|release|appbundle] [dev|staging|prod]

set -e

BUILD_TYPE=${1:-release}
FLAVOR=${2:-prod}

echo "🚀 Building Android app..."
echo "📦 Build Type: $BUILD_TYPE"
echo "🎨 Flavor: $FLAVOR"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
flutter clean
flutter pub get

# Build based on type
case $BUILD_TYPE in
  debug)
    echo "🔨 Building debug APK..."
    flutter build apk --debug --flavor $FLAVOR
    OUTPUT="build/app/outputs/flutter-apk/app-${FLAVOR}-debug.apk"
    ;;
    
  release)
    echo "🔨 Building release APK (split per ABI)..."
    flutter build apk --release --split-per-abi --flavor $FLAVOR
    OUTPUT="build/app/outputs/flutter-apk/"
    ;;
    
  appbundle)
    echo "🔨 Building App Bundle..."
    flutter build appbundle --release --flavor $FLAVOR
    OUTPUT="build/app/outputs/bundle/${FLAVOR}Release/app-${FLAVOR}-release.aab"
    ;;
    
  *)
    echo "❌ Invalid build type. Use: debug, release, or appbundle"
    exit 1
    ;;
esac

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo "📁 Output: $OUTPUT"
    
    # Show APK size
    if [ "$BUILD_TYPE" == "release" ]; then
        echo ""
        echo "📊 APK Sizes:"
        du -h build/app/outputs/flutter-apk/*.apk
    fi
    
    # Ask to install
    if [ "$BUILD_TYPE" != "appbundle" ]; then
        read -p "📱 Install to device? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if [ "$BUILD_TYPE" == "release" ]; then
                adb install -r build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
            else
                flutter install
            fi
        fi
    fi
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi
