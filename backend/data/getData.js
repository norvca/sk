const axios = require('axios');
const url = require('./url');
const bkSort = require('../sort/bk-sort');

function getData() {
  return axios.get(url).then(res => {
    const data = res.data;
    const sanitizedData = sanitizeData(data);
    if (sanitizedData[0].f2 === '-') return;

    const sortedData = addBk(sanitizedData);
    const result = formData(sortedData);

    return result;
  });
}

function sanitizeData(data) {
  const sanitizedData = JSON.parse(data.match(/{.*}/)[0]);
  const result = sanitizedData.data.diff;
  return result;
}

function formData(data) {
  const today = new Date();
  const year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  return {
    _id: `${year}-${month}-${day}`,
    data,
  };
}

function addBk(data) {
  let result = data.map(stock => {
    const stockCode = stock.f12;
    bkSort.map(b => {
      if (b.stocks.includes(stockCode)) {
        stock = {...stock, bk: b.name, bkName: b.bk};
        return stock;
      }
    });
    return stock;
  });
  return result;
}

module.exports = getData;
