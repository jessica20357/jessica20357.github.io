from __future__ import annotations

from collections import deque
from pathlib import Path
from shutil import copy2

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PICTURES = ROOT / "resources" / "pictures"
BACKUP = ROOT / "asset-backups" / "pictures-before-enhance"

PNG_FILES = [
    PICTURES / "paintings" / "books.png",
    PICTURES / "paintings" / "plant.png",
    PICTURES / "paintings" / "photo.png",
    PICTURES / "paintings" / "computer.png",
    PICTURES / "paintings" / "guitar.png",
    PICTURES / "paintings" / "about-character-dark.png",
    PICTURES / "paintings" / "about-character-light.png",
    PICTURES / "paintings" / "music-player.png",
    PICTURES / "UI picture" / "door-opem.png",
    PICTURES / "paintings" / "desk.png",
    PICTURES / "paintings" / "bookshelf.png",
    PICTURES / "UI picture" / "door-closed.png",
    PICTURES / "paintings" / "background.png",
]


def is_edge_gunk(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, a = pixel
    near_white = r > 238 and g > 238 and b > 238
    pale_low_saturation = max(r, g, b) > 230 and max(r, g, b) - min(r, g, b) < 22
    almost_transparent = a < 20
    return almost_transparent or (a > 0 and (near_white or pale_low_saturation))


def flood_remove_border_gunk(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    px = rgba.load()
    width, height = rgba.size
    seen: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in seen or not (0 <= x < width and 0 <= y < height):
            continue
        seen.add((x, y))
        if not is_edge_gunk(px[x, y]):
            continue

        px[x, y] = (255, 255, 255, 0)
        queue.extend(((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)))

    return rgba


def scale_for(path: Path, size: tuple[int, int]) -> int:
    width, height = size
    if path.name == "background.png":
        return 2
    if max(width, height) < 260:
        return 4
    if max(width, height) < 620:
        return 3
    return 2


def enhance(path: Path) -> None:
    backup_path = BACKUP / path.relative_to(PICTURES)
    backup_path.parent.mkdir(parents=True, exist_ok=True)
    if not backup_path.exists():
        copy2(path, backup_path)

    with Image.open(backup_path) as source:
        cleaned = flood_remove_border_gunk(source)
        factor = scale_for(path, cleaned.size)
        new_size = (cleaned.width * factor, cleaned.height * factor)
        scaled = cleaned.resize(new_size, Image.Resampling.LANCZOS)
        sharpened = scaled.filter(ImageFilter.UnsharpMask(radius=0.75, percent=115, threshold=3))
        sharpened.save(path, optimize=True)
        print(f"{path.relative_to(ROOT)}: {source.size[0]}x{source.size[1]} -> {new_size[0]}x{new_size[1]}")


def main() -> None:
    for path in PNG_FILES:
        enhance(path)


if __name__ == "__main__":
    main()
