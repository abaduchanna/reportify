#!/usr/bin/env python3
"""
Create icon.ico from Reportify logo
Run this before building the app
"""

from PIL import Image
import os

def create_icon():
    """Convert Reportify logo to icon.ico"""
    
    logo_path = "Reportify_Logo_-_Red_Theme__1_.png"
    icon_path = "assets/icon.ico"
    
    # Create assets folder if it doesn't exist
    os.makedirs("assets", exist_ok=True)
    
    if not os.path.exists(logo_path):
        print(f"❌ Logo file not found: {logo_path}")
        print("Make sure 'Reportify_Logo_-_Red_Theme__1_.png' is in the project root")
        return False
    
    try:
        # Open the logo image
        img = Image.open(logo_path)
        
        # Convert to RGBA if needed
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Resize to icon sizes (Windows expects 256x256 as largest)
        # Create multiple sizes for better quality
        sizes = [(16, 16), (32, 32), (64, 64), (128, 128), (256, 256)]
        icons = []
        
        for size in sizes:
            # Create a white background
            background = Image.new('RGBA', size, (255, 255, 255, 0))
            
            # Resize logo maintaining aspect ratio
            img_resized = img.copy()
            img_resized.thumbnail(size, Image.Resampling.LANCZOS)
            
            # Calculate position to center the logo
            offset = ((size[0] - img_resized.width) // 2,
                     (size[1] - img_resized.height) // 2)
            
            # Paste logo onto background
            background.paste(img_resized, offset, img_resized)
            icons.append(background)
        
        # Save as ICO file with all sizes
        icons[0].save(
            icon_path,
            format='ICO',
            sizes=[(img.size, img) for img in icons]
        )
        
        print(f"✅ Icon created successfully: {icon_path}")
        print(f"   Sizes included: {sizes}")
        return True
        
    except Exception as e:
        print(f"❌ Error creating icon: {e}")
        print("   Make sure Pillow is installed: pip install Pillow")
        return False

if __name__ == "__main__":
    success = create_icon()
    exit(0 if success else 1)
