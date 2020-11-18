const fs = require("fs");
const path = require("path");
const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, schemas } = require("../../.dist");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    fs.writeFileSync(path.join(__dirname, "./.out/word1.docx"), val);
    console.log("Save DONE.");
}

(async function () {
    debugger;
    try {
        let doSave = true;

        const testFile = path.join(__dirname, "./template/word1.docx");
        const buf = fs.readFileSync(testFile, null);
        const pkg = await OpenXmlPackage.open(Application, buf);
        debugger;

        const part = await parts.wordprocessing.DocumentPart.load(pkg);
        const doc = part.document;
        const body = doc.body;
        for (let item of body.descendants(schemas.wordprocessing.Paragraph)) {
            console.log(item.textContent);
        }
        debugger;

        const newPr = body.createElement(schemas.wordprocessing.Paragraph, {
            children: [body.createElement(schemas.wordprocessing.Run, {
                children: [body.createElement(schemas.wordprocessing.Text, {
                    text: `[${new Date().toLocaleString()}] This is a test!`
                })]
            })]
        });
        newPr.styleProperties.paragraphStyleId = 2;
        body.appendChild(newPr);
        part.commit();

        doSave && await save(pkg);
        
    } catch (error) {
        console.error(error);
    }
})();