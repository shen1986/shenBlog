import Mock from "mockjs";

const Goods: any[] = [];
for (let i = 0; i < 10; i++) {
    Goods.push(Mock.mock({
        id: Mock.Random.integer(60, 100),
        desc: Mock.Random.cparagraph(10, 20),
        img: Mock.Random.image('200x100', '#4A7BF7', i)
    }))
}

export { Goods }