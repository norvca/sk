const PouchDB = require('pouchdb');

const db = new PouchDB('http://localhost:5984/stock');
const getData = require('../data/getData');
const lastTradingDay = require('../utils/last-trading-day-2020');

async function freshData() {
  const todayResponse = await getData();
  const todayData = todayResponse.data;

  const yesterdayResponse = await db.get(lastTradingDay);
  const yesterdayData = yesterdayResponse.data;

  // 把昨日数据的换手率插入今日数据
  const todayResult = todayData.map(e => {
    yesterdayData.map(y => {
      if (e.f12 === y.f12) {
        e.f9 = y.f8;
        e.f10 = (((e.f8 - e.f9) / e.f9) * 100).toFixed(2);
      }
    });
    return e;
  });

  // 在数据库里匹配到了今日的 _id 就更新，不然就在错误捕捉里直接添加今日数据
  try {
    const todayDoc = await db.get(todayResponse._id);
    db.put({
      _id: todayResponse._id,
      _rev: todayDoc._rev,
      data: todayResult,
    });
  } catch (err) {
    db.put({_id: todayResponse._id, data: todayResult});
  }

  return todayResult;
}

module.exports = freshData;
