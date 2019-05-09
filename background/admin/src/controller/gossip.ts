import GossipModel from '../models/gossipModel';

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

    public findGossip = async (ctx: any): Promise<any> => {
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
}

export default new Gossip();