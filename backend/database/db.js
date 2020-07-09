const getData = require('../data/getData');
const PouchDB = require('pouchdb');
const moment = require('moment');

const db = new PouchDB('http://localhost:5984/stock');
const date = new Date();
const yesterdayString = moment(date).subtract(1, 'day').format().slice(0, 10);

function freshData() {
  return getData()
    .then(response => {
      return db
        .get(yesterdayString)
        .then(result => {
          const yesterdayData = result.data;
          const todayData = response.data;

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

          return todayResult;
        })
        .then(todayResult => {
          // 在数据库里匹配到了今日的 _id 就更新，不然就在错误捕捉里直接添加今日数据
          db.get(response._id)
            .then(doc => {
              db.put({
                _id: response._id,
                _rev: doc._rev,
                data: todayResult,
              }).catch(err => console.log(err));
            })
            .catch(() => {
              db.put({_id: response._id, data: todayResult});
            });
        });
    })
    .catch(err => console.log(err));
}

module.exports = freshData;
