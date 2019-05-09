import jwt from 'jsonwebtoken';
import config from '../config/config';

export let addToken = (userinfo: any) => { // 创建token并导出
    const token = jwt.sign({
        userid: userinfo.userid,
        password: userinfo.password
    }, config.tokenSerect, { expiresIn: '1h' });
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