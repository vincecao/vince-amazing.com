const fs = require('fs');
const client = require('https');
// const axios = require('axios');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

async function getAssetsBackdropImageResources() {
    const BACKDROP_IMAGE_IDS = JSON.parse(fs.readFileSync(`${__dirname}/../src/consts/backdrop-image-ids.json`));
    await Promise.all(BACKDROP_IMAGE_IDS.map((id) => downloadImage(`https://live.staticflickr.com/${id}.jpg`, `${__dirname}/../assets/preserved/imgs/backdrops/${id.replace(/\//g, '-')}.jpg`)))
}

getAssetsBackdropImageResources()