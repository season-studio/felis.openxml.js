import { IDom } from "./domInterface";
import { IZip } from "./zipInterface";
/**
 * Interface of an application enviroment
 */
export class IApplication {
    constructor () {}

    /**
     * The interface IZip for operating zip package
     */
    static ZIP = IZip;

    /**
     * The interface IDom for operating DOM
     */
    static DOM = IDom;
}