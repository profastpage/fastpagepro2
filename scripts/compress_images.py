#!/usr/bin/env python3
"""Compress portfolio PNG images to WebP for faster loading."""
import os
from PIL import Image

PORTFOLIO_DIR = '/home/z/my-project/fastpagepro2/public/images/03-portafolio'

def compress_png_to_webp(filepath, quality=80):
    """Convert PNG to WebP with compression."""
    try:
        img = Image.open(filepath)
        # Handle RGBA (transparent) images
        if img.mode == 'RGBA':
            webp_path = filepath.rsplit('.', 1)[0] + '.webp'
            img.save(webp_path, 'WEBP', quality=quality, method=6)
        else:
            img = img.convert('RGB')
            webp_path = filepath.rsplit('.', 1)[0] + '.webp'
            img.save(webp_path, 'WEBP', quality=quality, method=6)

        orig_size = os.path.getsize(filepath)
        webp_size = os.path.getsize(webp_path)
        savings = (1 - webp_size / orig_size) * 100
        print(f"  {os.path.basename(filepath)}: {orig_size/1024:.0f}KB -> {webp_size/1024:.0f}KB ({savings:.0f}% saved)")
        return webp_path
    except Exception as e:
        print(f"  ERROR {filepath}: {e}")
        return None

if __name__ == '__main__':
    total_orig = 0
    total_webp = 0

    for fname in sorted(os.listdir(PORTFOLIO_DIR)):
        if fname.lower().endswith('.png'):
            fpath = os.path.join(PORTFOLIO_DIR, fname)
            orig = os.path.getsize(fpath)
            total_orig += orig
            result = compress_png_to_webp(fpath)
            if result:
                total_webp += os.path.getsize(result)

    print(f"\nTotal: {total_orig/1024/1024:.1f}MB -> {total_webp/1024/1024:.1f}MB ({(1-total_webp/total_orig)*100:.0f}% saved)")