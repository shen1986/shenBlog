import jwt from 'jsonwebtoken';
const serect = 'shenxf1986@qq.com';  // 密钥，不能丢
export let addToken = (userinfo: any) => { // 创建token并导出
    const token = jwt.sign({
        userid: userinfo.userid,
        password: userinfo.password
    }, serect, { expiresIn: '1h' });
    return token;
};

export let decoded = (tokens: any) => {

    if (tokens) {
        const toke = tokens.split(' ')[1];
        // 解析
        const decoded = jwt.decode(toke);
        return decoded;
    }
};