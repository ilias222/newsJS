"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFileLoader = void 0;
const uuid_1 = require("uuid");
const publicPath = './public';
let path = publicPath;
class HelperFileLoader {
    set path(_path) {
        path = publicPath + _path;
    }
    customFileName(req, file, cb) {
        const originalName = file.originalname.split('.');
        const fileExtension = originalName[originalName.length - 1];
        cb(null, `${(0, uuid_1.v4)()}.${fileExtension}`);
    }
    destinationPath(req, file, cb) {
        cb(null, path);
    }
}
exports.HelperFileLoader = HelperFileLoader;
//# sourceMappingURL=HelperFileLoader.js.map