import ArticleModel from '../models/articleModel';

class Article {

    /**
     * @description: 取得文章列表
     * @param {any} ctx - koa上下文
     */
    public getArticles = async(ctx: any): Promise<void> => {
        const articleModel = new ArticleModel();
        try {
            const rows: any = await articleModel.findAll();

            ctx.body = {
                status: 1,
                info: rows
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '查询失败'
            };
        }
    }

    /**
     * @description: 删除文章
     * @param {any} ctx - koa上下文
     */
    public delArticle = async (ctx: any): Promise<void> => {
        const { id } = ctx.params;
        const articleModel = new ArticleModel();
        try {
            await articleModel.deleteById(id);

            ctx.body = {
                status: 1
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '删除失败'
            };
        }
    }

    /**
     * @description: 查找文章
     * @param {any} ctx - koa上下文
     */
    public findArticle = async (ctx: any): Promise<void> => {
        const { id } = ctx.params;
        const articleModel = new ArticleModel();
        try {
            const rows = await articleModel.findById(id);

            ctx.body = {
                status: 1,
                info: rows.length == 1 ? rows[0] : {}
            };
        } catch (error) {
            ctx.body = {
                status: 0,
                msg: '查询失败'
            };
        }
    }

    public submitArticle = async (ctx: any): Promise<void> => {
        const articleModel = new ArticleModel();
        try {
            if (ctx.request.body.id !== '') {
                articleModel.update(ctx.request.body);
            }
            else {
                articleModel.insert(ctx.request.body);
            }

            ctx.body = {
                status: 1
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: 0,
                msg: '操作失败'
            };
        }
    }
}

export default new Article();