const loadConfigFile = require('rollup/dist/loadConfigFile');
const path = require('path');
const rollup = require('rollup');
const fs = require('fs');
const crypto = require('crypto');

(async function() {
    // peek config information
    const {options, warnings} = await loadConfigFile(path.resolve(__dirname, './config.js'));
    console.log(`We currently have ${warnings.count} warnings`);
    warnings.flush();

    try {
        const writePromises = [];

        // rollup each bundle
        for (const inputOption of options) {
            const bundle = await rollup.rollup(inputOption);
            for (const outputOption of inputOption.output) {
                // generate the output data
                const { output } = await bundle.generate(outputOption);
                // check if there is any change by checking the hash of the output
                let content = "";
                for (const chunk of output) {
                    content += (chunk.source || chunk.code);
                }
                const distPath = path.resolve(process.cwd(), outputOption.file);
                const distHashPath = `${distPath}:hash`;
                const distHash = crypto.createHash('md5').update(content).digest("hex");
                if (fs.existsSync(distHashPath)) {
                    const oriHash = fs.readFileSync(distHashPath, {encoding:"utf8"});
                    if (oriHash === distHash) {
                        content = undefined;
                        console.log(`"${inputOption.input}" --> "${outputOption.file}" has no change.`)
                    }
                }
                // trigger the written action for the changed bundles
                if (content) {
                    writePromises.push(bundle.write(outputOption).then(() => {
                        fs.writeFileSync(distHashPath, distHash, {encoding:"utf8"});
                    }));
                }
            }
        }

        // wait until any written action has finished.
        await Promise.all(writePromises);
        console.log("All bundles have been saved");

        // trigger the entry module
        console.log("Starting debug program...");
        const entryPos = process.argv.indexOf("--entry");
        const entryFilePath = ((entryPos > 1) && process.argv[entryPos + 1]);
        entryFilePath ? require(path.resolve(process.cwd(), entryFilePath))
                      : console.log("No debug program configured.");
    } catch (error) {
        console.error(error);
    }
})();