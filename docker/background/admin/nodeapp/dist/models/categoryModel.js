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
const db_1 = __importDefault(require("./db"));
class CategoryModel {
    constructor() {
        /**
         * @description: 取得所有有效的分类数据
         * @return: 分类数据
         */
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const sql = `select id, theme from category where status = 1`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CategoryModel;
