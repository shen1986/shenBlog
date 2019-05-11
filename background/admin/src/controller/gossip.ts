/**
 * @Description:
 * @Author: shenxf
 * @Date: 2019-05-09 20:24:10
 */
import GossipModel from '../models/gossipModel';
import moment from 'moment';

class Gossip {

    public getGossip = async (ctx: any): Promise<any> => {
        const gossipModel = new GossipModel();

        try {
            const rows = await gossipModel.findAll();

            ctx.body = {
                status: 1, info: rows
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '查询失败'
            };
        }
    }

    public delGossip = async (ctx: any): Promise<void> => {
        const gossipModel = new GossipModel();
        const { id } = ctx.params;

        try {
            await gossipModel.deleteById(id);
            ctx.body = {
                status: 0,
                message: '删除失败'
            };
        } catch (error) {
            ctx.body = {
                status: 1
            };
        }
    }

    public findGossip = async (ctx: any): Promise<void> => {
        const gossipModel = new GossipModel();
        const { id } = ctx.params;

        try {
            const rows = await gossipModel.findById(id);
            ctx.body = {
                status: 0,
                info: rows.length == 1 ? rows[0] : {}
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '查询失败'
            };
        }
    }

    public submitGossip = async (ctx: any): Promise<void> => {
        const { id } = ctx.request.body;
        const gossipModel = new GossipModel();
        const create_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        console.log(create_at);

        try {
            if (id !== '') {
                gossipModel.updateGosAndFile(ctx.request.body);
            } else {
                gossipModel.saveGosAndFile(ctx.request.body);
            }

            ctx.body = {
                status: 1
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '操作失败'
            };
        }

    // let sql = "", fileName = null, saveName = null;
    // let { id, detail } = req.body;

    // if (req.file) {
    //     fileName = req.file.originalname;
    //     saveName = req.file.filename;
    // }
    // if (id != null) {
    //     sql = `update gossip set detail = ${mysql.escape(detail)}, file_name = ${mysql.escape(fileName)},
// 		save_name = ${mysql.escape(saveName)}, updated_at = "${new Date()._format("yyyy-MM-dd hh:mm:ss")}" where id = ${+id}`;
    // }
    // else {
    //     sql = `insert into gossip(detail, created_at, file_name, save_name) values (${mysql.escape(detail)},
// 		"${new Date()._format("yyyy-MM-dd hh:mm:ss")}", ${mysql.escape(fileName)}, ${mysql.escape(saveName)})`;
    // }

    // db.query(sql, function (err, rows) {
    //     if (err) {
    //         console.log(err);
    //         res.json({ status: 0, message: '操作失败' })
    //     }
    //     else {
    //         res.json({ status: 1 });
    //     }
    // })
    }
}

export default new Gossip();