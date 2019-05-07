import Mock from "mockjs";

const Users: any[] = [];
for (let i = 0; i < 100; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.integer(60, 100),
        time: Mock.Random.datetime(),
        desc: Mock.Random.cparagraph()
    }))
}

export { Users }