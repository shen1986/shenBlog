import CategoryModel from '../models/categoryModel';

class Category {

    public getCategories = async (ctx: any): Promise<void> => {
        const categoryModel = new CategoryModel();

        try {
            const rows = await categoryModel.findAll();
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
}

export default new Category();