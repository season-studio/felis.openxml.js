import {error} from "../common";

export class IDom {
    constructor () {}

    get primaryNode() {
        error.NoImplemented("IDom.primaryNode");
    }

    xpathSelect(_expression, _isSingle) {
        error.NoImplemented("IDom.xpathSelect");
    }

    createElement() {
        error.NoImplemented("IDom.createElement");
    }

    createElementNS() {
        error.NoImplemented("IDom.createElementNS");
    }

    static parse(_xmlString) {
        error.NoImplemented("IDom.parse");
    }

    static isElementNode(_obj) {
        error.NoImplemented("IDom.isElementNode");
    }
}
