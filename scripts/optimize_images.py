from PIL import Image
import os

images_to_process = [
    # (source, dest, max_w, quality, is_alpha)
    ('assets/images/logo-3-irmaos-sem-fundo.png', 'assets/images/logo-3-irmaos-sem-fundo.webp', 320, 90, True),
    ('assets/images/hero-moto-160.png', 'assets/images/hero-moto-160.webp', 500, 85, True),
    ('assets/images/foto-equipe-3-irmaos-premio.jpg', 'assets/images/foto-equipe-3-irmaos-premio.webp', 520, 76, False),
    ('assets/images/equipe-3-irmaos-premios-2.jpg', 'assets/images/equipe-3-irmaos-premios-2.webp', 520, 76, False),
    ('assets/images/services/revisao.jpg', 'assets/images/services/revisao.webp', 540, 76, False),
    ('assets/images/services/injecao.jpg', 'assets/images/services/injecao.webp', 540, 76, False),
    ('assets/images/services/motor.jpg', 'assets/images/services/motor.webp', 540, 76, False),
    ('assets/images/services/oleo.jpg', 'assets/images/services/oleo.webp', 540, 76, False),
    ('assets/images/reviews/moto-clean.jpg', 'assets/images/reviews/moto-clean.webp', 600, 76, False),
    ('assets/images/reviews/moto-dirty.jpg', 'assets/images/reviews/moto-dirty.webp', 600, 76, False),
    ('assets/images/gallery/gallery-1.jpg', 'assets/images/gallery/gallery-1.webp', 600, 76, False),
    ('assets/images/gallery/gallery-2.jpg', 'assets/images/gallery/gallery-2.webp', 600, 76, False),
]

total_orig = 0
total_webp = 0

print("=" * 65)
print("OTIMIZAÇÃO DEFINITIVA DE IMAGENS -> WEBP")
print("=" * 65)

for src, dest, max_w, quality, is_alpha in images_to_process:
    if not os.path.exists(src):
        continue

    orig_size = os.path.getsize(src)
    total_orig += orig_size

    with Image.open(src) as im:
        w, h = im.size
        if w > max_w:
            new_h = int(h * (max_w / w))
            im_resized = im.resize((max_w, new_h), Image.Resampling.LANCZOS)
        else:
            im_resized = im.copy()

        if is_alpha:
            im_resized.save(dest, 'WEBP', quality=quality, method=6)
        else:
            im_rgb = im_resized.convert('RGB')
            im_rgb.save(dest, 'WEBP', quality=quality, method=6)

    webp_size = os.path.getsize(dest)
    total_webp += webp_size

    reduction = ((orig_size - webp_size) / orig_size) * 100
    print(f"{os.path.basename(src):35} -> {orig_size//1024:4} KB -> {webp_size//1024:4} KB (-{reduction:.1f}%)")

saved_kb = (total_orig - total_webp) // 1024
total_reduction = ((total_orig - total_webp) / total_orig) * 100
print("=" * 65)
print(f"Total Original: {total_orig//1024} KB")
print(f"Total WebP:     {total_webp//1024} KB")
print(f"Economia Real:  {saved_kb} KB (-{total_reduction:.1f}%)")
print("=" * 65)
