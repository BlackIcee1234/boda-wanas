import sharp from "sharp";
import { mkdir, readdir } from "fs/promises";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "public/boda");
const OUTPUT_DIR = path.join(process.cwd(), "public/boda/optimized");

const HERO_SOURCE = "IMG_7780-Editar-2.jpg";

const GALLERY_SOURCES = [
  "IMG_7792-Editar.jpg",
  "IMG_7855-Editar.jpg",
  "IMG_7897-Editar.jpg",
  "IMG_7903-Editar-2.jpg",
  "IMG_7956-Editar.jpg",
  "IMG_7970-Editar-2.jpg",
  "IMG_7977-Editar-2.jpg",
  "IMG_7980-Editar-2.jpg",
  "IMG_8286-Editar.jpg",
  "IMG_8320-Editar.jpg",
  "IMG_8163.jpg",
  "IMG_8195.jpg",
];

async function optimizeImage(
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

  await optimizeImage(HERO_SOURCE, "hero.jpg", 1400, 82);

  for (let i = 0; i < GALLERY_SOURCES.length; i++) {
    await optimizeImage(GALLERY_SOURCES[i], `gallery-${i + 1}.jpg`, 1000, 80);
  }

  const outputFiles = await readdir(OUTPUT_DIR);
  console.log(`\nOptimizadas ${outputFiles.length} imágenes en public/boda/optimized/`);
}

main().catch(console.error);
