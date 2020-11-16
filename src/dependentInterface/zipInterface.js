import {error} from "../common";

export class IZip {
    constructor() { }

    async getFile(_file, _format) {
        error.NoImplemented("IZip.getFile");
    }

    setFile(_file, _content, _format) {
        error.NoImplemented("IZip.setFile");
    }

    async load(_file) {
        error.NoImplemented("IZip.load");
    }

    async save() {
        error.NoImplemented("IZip.save");
    }
}