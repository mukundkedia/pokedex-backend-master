const Fs = require('fs');
const Path = require('path');
const axios = require('axios');

const downloadImage = async(url) => {
    var fname = url.replace("https://assets.pokemon.com/assets/cms2/img/pokedex/full/", "");
    const writer = Fs.createWriteStream(`./assets/images/${fname}`);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      })
    
      response.data.pipe(writer);
    
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })
}

module.exports = downloadImage;