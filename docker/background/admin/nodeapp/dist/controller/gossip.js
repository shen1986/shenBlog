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
/**
 * @Description:说说管理
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
const gossipModel_1 = __importDefault(require("../models/gossipModel"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
class Gossip {
    constructor() {
        this.getGossip = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gossipModel = new gossipModel_1.default();
            try {
                const rows = yield gossipModel.findAll();
                ctx.body = {
                    status: 1, info: rows
                };
            }
            catch (error) {
                ctx.body = {
                    status: 0,
                    msg: '查询失败'
                };
            }
        });
        this.delGossip = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gossipModel = new gossipModel_1.default();
            const { id } = ctx.params;
            try {
                yield gossipModel.deleteById(id);
                ctx.body = {
                    status: 0,
                    message: '删除失败'
                };
            }
            catch (error) {
                ctx.body = {
                    status: 1
                };
            }
        });
        this.findGossip = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const gossipModel = new gossipModel_1.default();
            const { id } = ctx.params;
            try {
                const rows = yield gossipModel.findById(id);
                const result = {};
                if (rows.length == 1) {
                    result.detail = rows[0].detail;
                    result.id = rows[0].id;
                    if (!rows[0].uid || rows[0].uid === '') {
                        result.upload = [];
                    }
                    else {
                        result.upload = [
                            {
                                uid: rows[0].uid,
                                name: rows[0].file_name,
                                status: 'done',
                                thumbUrl: `data:image/${path_1.default.extname(rows[0].file_name)};base64,${rows[0].base64}`,
                                base64: rows[0].base64
                            },
                        ];
                    }
                }
                ctx.body = {
                    status: 1,
                    info: result
                };
            }
            catch (error) {
                console.log(error);
                ctx.body = {
                    status: 0,
                    msg: '查询失败'
                };
            }
        });
        this.submitGossip = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.request.body;
            const gossipModel = new gossipModel_1.default();
            const create_at = moment_1.default(new Date()).format('YYYY-MM-DD HH:mm:ss');
            try {
                if (id !== '') {
                    gossipModel.updateGosAndFile(ctx.request.body);
                }
                else {
                    gossipModel.saveGosAndFile(ctx.request.body);
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
exports.default = new Gossip();
