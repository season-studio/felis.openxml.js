const { OpenXmlAttribute, OpenXmlElement, OpenXmlPackage, OpenXmlPurePart, parts, schemas } = require("../../.dist");

const { Application } = require("./application/application");

async function save(_zip) {
    const val = await _zip.save();
    Application.saveToFile(val, "xlsx");
}

module.exports = async function () {
    try {
        let doSave = true;

        const buf = Application.pickFile(".xlsx");
        const pkg = await OpenXmlPackage.open(Application, buf);

        const workbookPart = await parts.spreadsheet.WorkbookPart.load(pkg);
        const sheetPart = await workbookPart.getSheetByIndex(0);

        const cellRead = sheetPart.data.getCell("B2");
        if (cellRead) {
            const div = document.getElementById("result");
            div && (div.textContent = `The data in B2 is ${cellRead.value}`);
        }

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

        doSave && await save(pkg);
        
    } catch (error) {
        console.error(error);
    }
}