const fs = require("fs");
const client = require("https");
const { pipeline } = require("stream/promises");
const sharp = require("sharp");

async function downloadImage(url, filepath) {
  try {
    const res = await new Promise((resolve, reject) => {
      client.get(url, resolve).on("error", reject);
    });

    if (res.statusCode !== 200) {
      res.resume();
      throw new Error(`Request Failed With Status Code: ${res.statusCode}`);
    }

    await pipeline(res, createCompressor(), fs.createWriteStream(filepath));

    return filepath;
  } catch (err) {
    console.error(`Failed to process ${url}: ${err.message}`);
    throw err; // Re-throw for upstream handling
  }
}

function createCompressor() {
  return sharp()
    .webp({
      quality: 10, // 1-100 scale
      alphaQuality: 10,
      effort: 6, // Max compression effort (slowest)
      smartSubsample: true,
      nearLossless: false, // Disable for true lossy compression
    })
    .resize(800)
    .on("error", (err) => {
      throw new Error(`Compression failed: ${err.message}`);
    });
}

async function getAssetsBackdropImageResources() {
  const BACKDROP_IMAGE_IDS = JSON.parse(fs.readFileSync(`${__dirname}/../src/consts/backdrop-image-ids.json`));
  await Promise.all(BACKDROP_IMAGE_IDS.map((id) => downloadImage(`https://live.staticflickr.com/${id}.jpg`, `${__dirname}/../assets/preserved/imgs/backdrops/${id.replace(/\//g, "-")}.webp`)));
}

getAssetsBackdropImageResources();
