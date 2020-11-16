import { readonly } from "../../common";
import { OpenXmlPart } from "./openXmlPart";

/**
 * basic class of all OpenXML part which content is binary
 * @extends OpenXmlPart
 */
export class OpenXmlBinaryPart extends OpenXmlPart {
    static ContentFormat = "binary";

    constructor (_opt) {
        super(_opt);
        readonly(this, {
            content: _opt.content
        });
    }
}
