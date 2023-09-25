"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt = require("bcrypt");
function hash(text) {
    return new Promise((resolve) => {
        bcrypt.hash(text, 10, (err, hash) => {
            resolve(hash);
        });
    });
}
exports.hash = hash;
function compare(text, hash) {
    return new Promise((resolve) => {
        bcrypt.compare(text, hash, (err, result) => {
            resolve(result);
        });
    });
}
exports.compare = compare;
//# sourceMappingURL=crypto.js.map