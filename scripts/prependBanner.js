const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('./package.json'));

let banner = `
/*!
* `+ pkg.name + ` - ` + pkg.description + `
* `+ pkg.repository.url + `
*
* author `+ pkg.author + `
*
* version `+ pkg.version + `
*
* build Sat Oct 21 2019
*
* Copyright yelloxing
* Released under the `+ pkg.license + ` license
*
* Date:`+ new Date() + `
*/\n\n`;

fs.readdirSync('./dist').forEach((url) => {
    url = "./dist/" + url;
    const temp = fs.readFileSync(url);
    fs.writeFileSync(url, banner);
    fs.appendFileSync(url, temp);


    if (/\.min\./.test(url)) {
        fs.writeFileSync('./docs/xhtml.js', banner);
        fs.appendFileSync('./docs/xhtml.js', temp);
    }
});
