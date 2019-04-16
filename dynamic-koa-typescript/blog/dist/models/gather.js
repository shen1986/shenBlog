"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: 点滴模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
const db = __importStar(require("./db"));
exports.getNotes = function (current = 1, count = 30) {
    return __awaiter(this, void 0, void 0, function* () {
        const field = 'id, title, detail, tag, created_at';
        const sql = `select ${field} from gather where status = 1 order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
        try {
            const rows = yield db.query(sql);
            const t = yield db.query('select count(*) as total from gather where status = 1 ');
            return {
                'status': 1,
                'notes': rows,
                'total': t[0]['total']
            };
        }
        catch (error) {
            throw error;
        }
    });
};
//# sourceMappingURL=gather.js.map