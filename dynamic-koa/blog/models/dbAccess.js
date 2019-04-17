/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-09 17:20:21
 */
var db = require("./db");

/**
 * 右边栏等的初始化
 * @param {any} ctx - 上下文
 * @param {any} next - 下一个函数
 */
module.exports.initWindow = async function (ctx, next) {
  try {
    console.log(1);
    var result = await getNavsideInfo();
    ctx.res.$initValue = result;
    console.log(2);
  } catch (error) {
    console.log(3);
    throw error;
  } finally {
    console.log(error);
    await next();
  }
}

/**
 * 取得右边栏情报
 */
var getNavsideInfo = async function () {
  let sqls = [
    "select value from config where (name = 'intro' or name = 'view_count') and status = 1",
    "select id, title from article where status = 1 order by created_at desc limit 10",
    "select id, theme from category where status = 1",
    "select id, text, url from link where status = 1",
    "select distinct tag,created_at  from article where status = 1 order by created_at desc limit 15",
    "select count(*) as count from article where status = 1"
  ];

  let ps = [];
  for (sql of sqls) {
    ps.push(
      db.query(sql)
    );
  }

  try {
    const p = await Promise.all(ps);
    return result(p);
  } catch (error) {
    throw error;
  }
};

/**
 * 画面结果返回钱包装
 * @param {any} out - sql取得的结果
 */
var result = function (out) {
  let tags = [];
  for (item of out[4]) {
    tags.push(
      ...item["tag"]
        .trim()
        .replace(/\s/, " ")
        .split(" ")
    );
  }
  tags = [...new Set(tags)];
  return {
    status: 1,
    portrait: {
      intro: out[0][0]["value"],
      viewCount: out[0][1]["value"],
      articleCount: out[5][0]["count"]
    },
    articles: out[1],
    categories: out[2],
    links: out[3],
    tags: tags,
    colors: ["#f50", "#f8a72a", "#87d068", "#108ee9", "#6b61f0"]
  };
};