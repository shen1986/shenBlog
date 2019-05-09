import crypto from 'crypto';
import config from '../../common/config/config';

export let sha256 = function(input: string): string {
    const hash = crypto.createHmac('sha256', config.sha256Serect)
        .update(input)
        .digest('hex');
    return hash;
};