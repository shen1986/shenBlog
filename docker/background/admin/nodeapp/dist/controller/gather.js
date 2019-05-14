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
const gatherModel_1 = __importDefault(require("../models/gatherModel"));
class Gather {
    constructor() {
        this.getGather = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gatherModel = new gatherModel_1.default();
            try {
                const rows = yield gatherModel.findAll();
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
        this.delGather = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gatherModel = new gatherModel_1.default();
            const { id } = ctx.params;
            try {
                yield gatherModel.deleteById(id);
                ctx.body = {
                    status: 1
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    message: '删除失败'
                };
            }
        });
        this.findGather = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gatherModel = new gatherModel_1.default();
            const { id } = ctx.params;
            try {
                const rows = yield gatherModel.findById(id);
                ctx.body = {
                    status: 1,
                    info: rows.length == 1 ? rows[0] : {}
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    message: '查询失败'
                };
            }
        });
        this.submitGather = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gatherModel = new gatherModel_1.default();
            const { id } = ctx.request.body;
            try {
                if (id !== '') {
                    yield gatherModel.update(ctx.request.body);
                }
                else {
                    yield gatherModel.insert(ctx.request.body);
                }
                ctx.body = {
                    status: 1
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    msg: '操作失败'
                };
            }
        });
    }
}
exports.default = new Gather();
