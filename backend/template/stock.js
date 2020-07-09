const bkSort = require('../sort/bk-sort');

let stockArr = bkSort.map(
  e => `<a bk="${e.bk}" class="br b--light-silver fl ph3 pv2">${e.name}</a>`,
);

let result = stockArr.join(' ');

console.log(result);
