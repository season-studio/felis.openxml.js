import { readonly, error, genRandId } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart } from "../../basic";

const assert = error.assert;

//#endregion

/**
 * Class of operating the document part
 * @class DocumentPart
 */
export const DocumentPart = OpenXmlPart.register(class DocumentPart extends OpenXmlPurePart {
    //#region override the shemas infomation and so on
    static SchemasURI = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
    static ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
    static DefaultPath = "word/document.xml";
    //#endregion

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        readonly(this, "document", this.primaryElement);
    }
});