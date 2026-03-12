// Pixel sprite definitions for Three.js DataTexture rendering.
// Each sprite is a flat Uint8Array of RGBA pixels in row-major order.
// Width × Height determines the pixel dimensions of the sprite.

export interface PixelSprite {
  width: number;
  height: number;
  /** RGBA flat array (length = width * height * 4) */
  data: Uint8Array;
}

// Color palette (RGBA)
const _ = [0, 0, 0, 0] as const;       // transparent
const W = [220, 220, 220, 255] as const; // white/light gray
const G = [120, 120, 120, 255] as const; // mid gray
const D = [60, 60, 60, 255] as const;   // dark gray
const B = [30, 30, 80, 255] as const;   // dark blue (wheels)

function buildSprite(
  width: number,
  height: number,
  rows: (typeof _ | typeof W | typeof G | typeof D | typeof B)[][]
): PixelSprite {
  const data = new Uint8Array(width * height * 4);
  rows.forEach((row, y) => {
    row.forEach((pixel, x) => {
      const idx = (y * width + x) * 4;
      data[idx]     = pixel[0];
      data[idx + 1] = pixel[1];
      data[idx + 2] = pixel[2];
      data[idx + 3] = pixel[3];
    });
  });
  return { width, height, data };
}

/**
 * 16×8 pixel bike rider sprite (facing right)
 * Row 0 = top, Row 7 = bottom
 */
export const BIKE_RIDER_SPRITE: PixelSprite = buildSprite(16, 8, [
  [_, _, _, _, W, W, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, W, W, W, W, _, _, _, _, _, _, _, _, _],
  [_, _, _, W, G, W, _, _, _, _, _, _, _, _, _, _],
  [_, _, D, D, D, D, D, D, D, D, D, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, G, G, G, G, D, _, _, _],
  [_, D, _, _, _, _, _, _, _, _, _, _, D, _, D, D],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, D, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
]);

/**
 * 8×8 pixel star/sparkle sprite
 */
export const STAR_SPRITE: PixelSprite = buildSprite(8, 8, [
  [_, _, _, W, _, _, _, _],
  [_, _, _, W, _, _, _, _],
  [_, _, _, W, _, _, _, _],
  [W, W, W, W, W, W, W, W],
  [_, _, _, W, _, _, _, _],
  [_, _, _, W, _, _, _, _],
  [_, _, _, W, _, _, _, _],
  [_, _, _, _, _, _, _, _],
]);
