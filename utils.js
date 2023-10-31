const path = require("path");
const fs = require("fs");
const {SitemapStream, streamToPromise} = require("sitemap");
const {Readable} = require("stream");

exports.generateSitemap = async (allLoc) => {
    try {
        const folder = path.join(__dirname + `/sitemap`);
        const isDirExists = fs.existsSync(folder);
        if (!isDirExists) {
            fs.mkdirSync(folder, {recursive: true});
        }

        // Create a stream to write to
        const stream = new SitemapStream({hostname: 'https://example.com/sitemap.xml'});
        const newSitemap = await streamToPromise(Readable.from(allLoc).pipe(stream)).then((data) =>
            data.toString()
        );
        fs.writeFileSync(folder + "/sitemap.xml", newSitemap.toString());
        return true;
    } catch (e) {
        return false;
    }
}
