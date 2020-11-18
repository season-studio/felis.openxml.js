import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the worksheet, element with tag "worksheet"
 */
export const WorkSheet = OpenXmlElement.register(class WorkSheet extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "worksheet";
    //#endregion
});