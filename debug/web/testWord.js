const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, schemas } = require("../../.dist");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    Application.saveToFile(val, "docx");
}

module.exports = async function () {
    try {
        let doSave = true;

        const fileBuf = await Application.pickFile(".docx");
        const pkg = await OpenXmlPackage.open(Application, fileBuf);

        const part = await parts.wordprocessing.DocumentPart.load(pkg);
        const doc = part.document;
        const body = doc.body;
        const content = [];
        for (let item of body.descendants(schemas.wordprocessing.Paragraph)) {
            content.push(item.textContent);
        }
        const div = document.getElementById("result");
        div.innerHTML = content.join("<br />");

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
}