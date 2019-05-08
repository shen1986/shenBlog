/*
 * @Description: 通用工具类
 * @Author: shenxf
 * @Date: 2019-05-08 11:04:04
 */

interface CommonInter {
    getImageURLToBase64: (url: string, callback: any) => void;
    getBase64: (file: any, callback: any) => void;
}

class CommonTools implements CommonInter {
    /**
     * @description: 根据URL转换Base64使用canvas的toDataURL方式
     * @param {url} 图片路径
     * @param {callback} 回调函数
     */
    public getImageURLToBase64(url: string, callback: any): void {
        const timeStamp = +new Date();
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url + '?' + timeStamp;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx: CanvasRenderingContext2D | null;
            ctx = canvas.getContext('2d');
            if (ctx !== null) {
                ctx.drawImage(image, 0, 0, image.width, image.height);
            }
            const ext = image.src.substring(image.src.lastIndexOf('.') + 1, image.src.lastIndexOf('?')).toLowerCase();
            const dataURL = canvas.toDataURL('image/' + ext);
            callback(dataURL);
        };
    }
    /**
     * @description: 获取图片base64
     * @param {file} 图片文件
     * @param {callback} 回调函数
     */
    public getBase64(file: any, callback: any): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result !== null && typeof reader.result === 'string') {
                const w = reader.result.indexOf(',');
                if (callback) {
                    callback(reader.result, reader.result.substring(w + 1));
                }
            }
        };
    }

}
export default new CommonTools();
