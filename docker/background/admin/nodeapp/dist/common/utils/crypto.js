"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../../common/config/config"));
exports.sha256 = function (input) {
    const hash = crypto_1.default.createHmac('sha256', config_1.default.sha256Serect)
        .update(input)
        .digest('hex');
    return hash;
};
