/**
 * @Description: 共通复制
 * @Author: shenxf
 * @Date: 2019-04-17 20:38:11
 */
import * as shell from 'shelljs';

shell.cp('-R', 'src/public/js', 'dist/public/');
shell.cp('-R', 'src/public/images', 'dist/public/');
shell.cp('-R', 'src/public/icoFonts', 'dist/public/');
shell.cp('-R', 'src/public/lib', 'dist/public/'); // 第三方js
shell.cp('-R', 'src/public/favicon.ico', 'dist/public/');
shell.cp('-R', 'src/public/views', 'dist/public/'); // 模版