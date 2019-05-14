/*
 * @Description: 初期处理
 * @Author: shenxf
 * @Date: 2019-04-09 17:20:21
 */
import db from './db';

export let initWindow = async (ctx: any, next: any) => {
    const result = await getNavsideInfo();

    // 异常终了
    if (result.status !== 1) {
        await next(result);
    } else {
        ctx.res.$initValue = result;
        await next();
    }
};

// 取得右边栏情报
const getNavsideInfo = async () => {
    const sqls = [
        'select value from config where (name = "intro" or name = "view_count") and status = 1',
        'select id, title from article where status = 1 order by created_at desc limit 10',
        'select id, theme from category where status = 1',
        'select id, text, url from link where status = 1',
        'select distinct tag,created_at  from article where status = 1 order by created_at desc limit 15',
        'select count(*) as count from article where status = 1'
    ];

  const ps = [];
  for (const sql of sqls) {
    ps.push(
        db.query(sql)
    );
  }
  const p = await Promise.all(ps);
  try {
    return result(p);
  } catch (error) {
    return {
      status: 0,
      message: error.sqlMessage
    };
  }
};

const result = (out: any) => {
  let tags = [];
  let item: any = {};
  for (item of out[4]) {
    tags.push(
      ...item['tag']
        .trim()
        .replace(/\s/, ' ')
        .split(' ')
    );
  }
  tags = [...new Set(tags)];
  return {
    status: 1,
    portrait: {
      intro: out[0][0]['value'],
      viewCount: out[0][1]['value'],
      articleCount: out[5][0]['count']
    },
    articles: out[1],
    categories: out[2],
    links: out[3],
    tags: tags,
    colors: ['#f50', '#f8a72a', '#87d068', '#108ee9', '#6b61f0']
  };
};