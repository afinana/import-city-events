/* Require dependencies */
var https = require('https');
var zlib = require('zlib');
const fs = require('fs');


module.exports = (url, dest, cb) => {
    var options = {
     headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36'
        },
        /* GZIP true for most of the websites now, disable it if you don't need it */
        gzip: true,
        followRedirect: true
    
    }
    var file = fs.createWriteStream(dest);
    /* Create a new csv (or in this case psv) stream */
    /* Read the specified file and pipe the data into the psv stream */
    var request = https.get(url, options, function (response) {
        response.pipe(zlib.createGunzip()).pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
           
        });
    }).on('error', function (err) { // Handle errors
        console.error(err);
        fs.unlink(cb); // Delete the file async. (But we don't check the result)
      
    });

}