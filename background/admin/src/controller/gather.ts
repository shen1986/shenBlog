import GatherModel from '../models/gatherModel';

class Gather {

    public getGather = async (ctx: any): Promise<void> => {
        const gatherModel = new GatherModel();

        try {
            const rows = await gatherModel.findAll();

            ctx.body = {
                status: 1,
                info: rows
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                message: '查询失败'
            };
        }
    }

    public delGather = async (ctx: any): Promise<void> => {
        const gatherModel = new GatherModel();
        const { id } = ctx.params;

        try {
            await gatherModel.deleteById(id);

            ctx.body = {
                status: 1
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                message: '删除失败'
            };
        }
    }

    public findGather = async (ctx: any): Promise<any> => {
        const gatherModel = new GatherModel();
        const { id } = ctx.params;

        try {
            const rows: any = await gatherModel.findById(id);

            ctx.body = {
                status: 1,
                info: rows.length == 1 ? rows[0] : {}
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                message: '查询失败'
            };
        }
    }

    public submitGather = async (ctx: any): Promise<void> => {
        const gatherModel = new GatherModel();

        const { id } = ctx.request.body;

        try {
            if (id !== '') {
                await gatherModel.update(ctx.request.body);
            }
            else {
                await gatherModel.insert(ctx.request.body);
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
    }
}

export default new Gather();