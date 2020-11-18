const fs = require("fs");
const path = require("path");
const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, schemas } = require("../../.dist");
const { DOMImplementation, Node } = require("xmldom/lib/dom");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    fs.writeFileSync(path.join(__dirname, "./.out/excel1.xlsx"), val);
    console.log("Save DONE.");
}

(async function () {
    debugger;
    try {
        let doSave = true;

        const testFile = path.join(__dirname, "./template/excel1.xlsx");
        const buf = fs.readFileSync(testFile, null);
        const pkg = await OpenXmlPackage.open(Application, buf);
        debugger;

        const workbookPart = await parts.spreadsheet.WorkbookPart.load(pkg);
        const sheetPart = await workbookPart.getSheetByIndex(0);
        debugger;

        const cellRead = sheetPart.data.getCell("B2");
        cellRead && console.log("The data in B2 is", cellRead.value);

        for(let row of sheetPart.data.rows) {
            row.remove();
        }

        let cell = sheetPart.data.acquireCell("C1");
        if (cell) {
            cell.dataType = schemas.spreadsheet.DataType.String
            cell.value = "Hello World";
        }

        sheetPart.data.fillRangeWithTable("A2", [[
            1, 2, 3, 4, 5, 6
        ], {
            a: "Hello",
            b: "World"
        }, "this is a test".split(" ")]);

        const table = sheetPart.data.getRangeToTable("A1", 5, 7);
        console.log(table);

        sheetPart.commit();

        debugger;
        doSave && await save(pkg);
        
    } catch (error) {
        console.error(error);
    }
})();