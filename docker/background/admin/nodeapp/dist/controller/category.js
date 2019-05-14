"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class Category {
    constructor() {
        this.getCategories = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const categoryModel = new categoryModel_1.default();
            try {
                const rows = yield categoryModel.findAll();
                ctx.body = {
                    status: 1,
                    info: rows
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    message: '查询失败'
                };
            }
        });
    }
}
exports.default = new Category();
