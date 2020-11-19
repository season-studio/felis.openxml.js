const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, schemas } = require("../../.dist");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    Application.saveToFile(val, "pptx");
}

module.exports = async function () {
    try {
        let doSave = false;

        const fileBuf = await Application.pickFile(".pptx");
        const pkg = await OpenXmlPackage.open(Application, fileBuf);

        const presentation = await parts.presentation.PresentationPart.load(pkg, "/ppt/presentation.xml");
        console.log("The count of the slides in this presentation = ", presentation.slideSet.count);
        const textSet = [];
        for (let item of presentation.slideSet.slides()) {
            const slidePart = await item.getter;
            const textContent = [];
            if (slidePart) {
                console.log("\tprocessing page ", item.inde);
                slidePart
                    .slide
                    .commonData
                    .descendants(schemas.drawing.TextBody)
                    .map(textBody => textBody.textContent.trim() && textContent.push(textBody.textContent));
            }
            textSet.push(textContent.join("<br />"));
        }

        console.log("all text in this presentaion are:");
        console.log(textSet);

        const div = document.getElementById("result");
        div.innerHTML = `The count of the slides in this presentation = ${presentation.slideSet.count} <br />
        ${textSet.map((item, index) => `[Page ${index + 1}] <br />${item}`).join("<br />")}`;

        doSave && await save(pkg);
        
    } catch (error) {
        console.error(error);
    }
}