#!/bin/bash

# Take screenshots of VHV Enterprise App for Play Store
# Usage: ./take_screenshots.sh

set -e

echo "📱 VHV Enterprise App - Screenshot Tool"
echo "========================================"
echo ""

# Create directories
mkdir -p screenshots/raw
mkdir -p screenshots/framed
mkdir -p screenshots/phone/en-US
mkdir -p screenshots/phone/vi-VN

# Check if device is connected
if ! adb devices | grep -q "device$"; then
    echo "❌ No device connected!"
    echo "Please connect an Android device or start an emulator."
    exit 1
fi

echo "✅ Device connected"
echo ""

# Build and run app
echo "🚀 Building and launching app..."
flutter run --release --flavor prod &
APP_PID=$!

# Wait for app to launch
echo "⏳ Waiting for app to launch (15 seconds)..."
sleep 15

echo ""
echo "📸 Screenshot Guide"
echo "==================="
echo ""
echo "Navigate to each screen and press Enter to capture."
echo "Screenshots will be saved to: screenshots/raw/"
echo ""

# Array of screenshots to take
declare -a screens=(
    "01-login:Login Screen"
    "02-dashboard:Dashboard/Home Screen"
    "03-notifications:Notifications Screen"
    "04-settings:Settings Screen"
    "05-profile:Profile Screen"
    "06-security:Security Settings"
    "07-devices:Device Management"
    "08-help:Help Center"
)

# Take screenshots
for screen in "${screens[@]}"; do
    IFS=: read -r filename description <<< "$screen"
    
    echo "📌 $description"
    echo "   Navigate to this screen, then press Enter..."
    read
    
    adb exec-out screencap -p > "screenshots/raw/${filename}.png"
    
    if [ $? -eq 0 ]; then
        echo "   ✓ Saved ${filename}.png"
    else
        echo "   ✗ Failed to capture ${filename}.png"
    fi
    
    echo ""
done

# Stop app
echo "🛑 Stopping app..."
kill $APP_PID 2>/dev/null || true

echo ""
echo "✅ Screenshot capture complete!"
echo ""
echo "📁 Raw screenshots saved to: screenshots/raw/"
echo ""
echo "🎨 Next Steps:"
echo "1. Review screenshots in screenshots/raw/"
echo "2. Add device frames at https://appure.io/ or https://shots.so/"
echo "3. Save framed screenshots to screenshots/framed/"
echo "4. Organize by language in screenshots/phone/[locale]/"
echo "5. Upload to Google Play Console"
echo ""
echo "📊 Screenshot info:"
ls -lh screenshots/raw/*.png | awk '{print "   " $9 " - " $5}'
echo ""
echo "🎉 Happy Publishing!"
