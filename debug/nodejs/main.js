const fs = require("fs");
const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, elements } = require("../../.dist");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    fs.writeFileSync("D:\\.Test\\ppt\\test.@.pptx", val);
    console.log("Save DONE.");
}

(async function () {
    debugger;
    try {
        let doSave = true;
        const testFile = "D:\\.Test\\ppt\\test.pptx";
        const buf = fs.readFileSync(testFile, null);
        const pkg = await OpenXmlPackage.open(Application, buf);
        debugger;

        const presentation = await parts.presentation.PresentationPart.load(pkg, "/ppt/presentation.xml");
        console.log("presentation has slides count = ", presentation.slideSet.count);
        console.log(presentation.primaryElement.descendants(elements.office.AttrRelationshipId.xpath("rId3")));
        const slide = await presentation.getRelationPart(parts.presentation.SlidePart);
        console.log(slide);
        const part3 = await presentation.getRelationPart("rId3");
        console.log(part3);
        for (let item of presentation.slideSet.slides()) {
            const s = await item.getter;
            if (s) {
                console.log(`【Page: ${item.index}】`);
                const tree = s.slide.commonData.shapeTree;
                if (tree) {
                    for (let vItem of tree.visualChildren()) {
                        console.log(`${vItem.className}: ${vItem.nonVisualProperties.name}`);
                    }
                }
                //s.slide.commonData.descendants(schemas.drawing.TextBody).map(tb => tb.textContent.trim() && console.log(tb.textContent));
            }
        }
        debugger;

        const rid = await presentation.slideSet.insert(0);
        console.log("Duplicate page of relationship ID = ", rid);

        doSave && await save(pkg);
        
    } catch (error) {
        console.error(error);
    }
})();