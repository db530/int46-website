import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = (p) => path.join(root, "public", "images", p);

const jobs = [
  // [source, output, maxWidth, format, quality]
  ["home/contemporary-villa-with-expansive-garden-water-feature.jpg", null, 2400, "jpeg", 85],
  ["home/image0.jpeg", null, 2000, "jpeg", 85],
  ["projects/shed-living-warsaw/IMG_2800.jpeg", null, 2000, "jpeg", 85],
  ["founder/7FD45239-9866-4663-87FD-ACB37919AB33.PNG", null, 1000, "png", null],
  // 41MB PNG → compressed JPG (reference updated in code)
  ["home/IMG_1420.PNG", "home/IMG_1420.jpg", 2000, "jpeg", 85],
];

for (const [src, out, maxW, fmt, q] of jobs) {
  const inPath = img(src);
  const outPath = img(out ?? src);
  const inputBuf = fs.readFileSync(inPath);
  const before = inputBuf.length;

  let pipe = sharp(inputBuf).resize({ width: maxW, withoutEnlargement: true });
  if (fmt === "jpeg") pipe = pipe.jpeg({ quality: q, mozjpeg: true });
  if (fmt === "png") pipe = pipe.png({ compressionLevel: 9, quality: 80 });

  const buf = await pipe.toBuffer();
  fs.writeFileSync(outPath, buf);
  const after = buf.length;

  console.log(
    `${src.split("/").pop()}  ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(2)}MB` +
      (out ? `  (new: ${out.split("/").pop()})` : "")
  );
}

// Remove the original 41MB PNG now that we have the JPG
const oldPng = img("home/IMG_1420.PNG");
if (fs.existsSync(img("home/IMG_1420.jpg"))) {
  fs.unlinkSync(oldPng);
  console.log("Deleted original IMG_1420.PNG");
}
