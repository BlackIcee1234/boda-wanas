import sharp from "sharp";
import { mkdir, readdir, rm } from "fs/promises";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "public/boda/invitacion-src");
const OUTPUT_DIR = path.join(process.cwd(), "public/boda/optimized");

/** Hands photo Mich liked for the phrase section */
const PHRASE_SOURCE = "IMG_6461.jpg";

async function optimize(
  sourceName: string,
  outputName: string,
  width: number,
  quality: number
) {
  const input = path.join(SOURCE_DIR, sourceName);
  const output = path.join(OUTPUT_DIR, outputName);
  await sharp(input)
    .rotate()
    .resize(width, undefined, { withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(output);
  console.log(`✓ ${outputName}`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Remove old gallery/hero optimized jpgs (keep other assets if any)
  const existing = await readdir(OUTPUT_DIR);
  for (const file of existing) {
    if (/^(gallery-\d+|phrases|hero)\.jpg$/i.test(file)) {
      await rm(path.join(OUTPUT_DIR, file));
    }
  }

  const files = (await readdir(SOURCE_DIR))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Prefer couple hands photo first in gallery too
  const ordered = [
    PHRASE_SOURCE,
    ...files.filter((f) => f !== PHRASE_SOURCE),
  ];

  await optimize(PHRASE_SOURCE, "phrases.jpg", 1400, 82);

  for (let i = 0; i < ordered.length; i++) {
    await optimize(ordered[i], `gallery-${i + 1}.jpg`, 1100, 80);
  }

  // Keep a hero still as first couple photo (video is primary on cover)
  await optimize(ordered[0], "hero.jpg", 1400, 82);

  console.log(`\nListo: ${ordered.length} fotos de galería + phrases.jpg`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
