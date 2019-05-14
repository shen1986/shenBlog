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
const mysql_1 = __importDefault(require("mysql"));
class GatherModel {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'select id, title, tag, created_at from gather where status = 1 order by id desc';
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `update gather set status = 0 where id = ${+id}`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `select id, title, detail, tag from gather where id = ${+id} and status = 1`;
            try {
                const result = yield db_1.default.query(sql);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.update = (gatherInfo) => __awaiter(this, void 0, void 0, function* () {
            const { id, content, title, tag } = gatherInfo;
            const sql = `update gather set detail = ${mysql_1.default.escape(content)}, title = ${mysql_1.default.escape(title)},
                    tag = ${mysql_1.default.escape(tag)}, updated_at = "${new Date().toLocaleDateString()}" where id = ${+id}`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
        this.insert = (gatherInfo) => __awaiter(this, void 0, void 0, function* () {
            const { content, title, tag } = gatherInfo;
            const sql = `insert into gather(title, tag, created_at, detail) values (${mysql_1.default.escape(title)},
                    ${mysql_1.default.escape(tag)}, "${new Date().toLocaleDateString()}", ${mysql_1.default.escape(content)})`;
            try {
                yield db_1.default.query(sql);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = GatherModel;
