import crypto from 'crypto';

const md5 = crypto.createHash('md5');

export let sha256 = function(input: string): string {
    const secret = 'shenxf';
    const hash = crypto.createHmac('sha256', secret)
        .update(input)
        .digest('hex');
    return hash;
};