#!/usr/bin/env python3
"""
Generate placeholder app icons for VHV Enterprise App
Requires: Pillow (pip install Pillow)
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_gradient_icon(filename, color1, color2, letter="V", size=1024):
    """Create a gradient icon with a letter"""
    # Create image
    img = Image.new('RGB', (size, size), color=color1)
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background
    for y in range(size):
        # Linear gradient from color1 to color2
        ratio = y / size
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.rectangle([(0, y), (size, y + 1)], fill=(r, g, b))
    
    # Draw white circle background
    padding = size // 4
    circle_bbox = [padding, padding, size - padding, size - padding]
    draw.ellipse(circle_bbox, fill='white')
    
    # Draw letter
    try:
        # Try to use a nice font
        font_size = size // 2
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        # Fallback to default
        font = ImageFont.load_default()
    
    # Get text bounding box
    text_bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Center text
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - size // 20  # Slight adjustment
    
    # Draw letter with gradient color
    draw.text((text_x, text_y), letter, fill=color1, font=font)
    
    # Save
    img.save(filename, 'PNG')
    print(f"✓ Created {filename}")

def create_foreground_icon(filename, letter="V", size=1024):
    """Create transparent foreground icon with letter"""
    # Create transparent image
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw letter with shadow
    try:
        font_size = size // 2
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    # Get text bounding box
    text_bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Center text
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - size // 20
    
    # Draw shadow
    shadow_offset = size // 50
    draw.text((text_x + shadow_offset, text_y + shadow_offset), letter, 
              fill=(0, 0, 0, 50), font=font)
    
    # Draw letter
    draw.text((text_x, text_y), letter, fill=(255, 255, 255, 255), font=font)
    
    # Save
    img.save(filename, 'PNG')
    print(f"✓ Created {filename}")

def create_splash_logo(filename, color1, color2, size=512):
    """Create splash screen logo"""
    # Create transparent image
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient circle
    for i in range(size // 2):
        ratio = i / (size // 2)
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        
        bbox = [i, i, size - i, size - i]
        draw.ellipse(bbox, fill=(r, g, b, 255))
    
    # Draw white "V" letter
    try:
        font_size = size // 3
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    letter = "V"
    text_bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    text_x = (size - text_width) // 2
    text_y = (size - text_height) // 2 - size // 30
    
    draw.text((text_x, text_y), letter, fill=(255, 255, 255, 255), font=font)
    
    # Save
    img.save(filename, 'PNG')
    print(f"✓ Created {filename}")

def main():
    print("🎨 Generating placeholder app icons...\n")
    
    # Create assets/icon directory if not exists
    os.makedirs(".", exist_ok=True)
    
    # Color schemes (RGB)
    colors = {
        'prod': ((59, 130, 246), (147, 51, 234)),      # Blue to Purple
        'dev': ((16, 185, 129), (6, 182, 212)),        # Green to Cyan
        'staging': ((245, 158, 11), (249, 115, 22)),   # Orange to Orange-Red
    }
    
    # Generate production icons
    print("📱 Production Icons:")
    create_gradient_icon('app_icon.png', colors['prod'][0], colors['prod'][1])
    create_foreground_icon('app_icon_foreground.png')
    
    # Generate dev icons
    print("\n🔧 Development Icons:")
    create_gradient_icon('app_icon_dev.png', colors['dev'][0], colors['dev'][1])
    
    # Generate staging icons
    print("\n🧪 Staging Icons:")
    create_gradient_icon('app_icon_staging.png', colors['staging'][0], colors['staging'][1])
    
    # Generate splash logo
    print("\n🌅 Splash Screen:")
    os.makedirs("../splash", exist_ok=True)
    create_splash_logo('../splash/splash_logo.png', colors['prod'][0], colors['prod'][1])
    
    print("\n✅ All placeholder icons created!")
    print("\n📝 Next steps:")
    print("1. Replace these placeholders with your actual brand icons")
    print("2. Run: flutter pub get")
    print("3. Run: flutter pub run flutter_launcher_icons")
    print("4. Run: flutter pub run flutter_native_splash:create")

if __name__ == '__main__':
    main()
