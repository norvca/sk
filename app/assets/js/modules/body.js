import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import getToday from '../utils/getToday';
import axios from 'axios';
import url from '../url';
import template from './template';

PouchDB.plugin(PouchdbFind);

const db = new PouchDB('http://localhost:5984/stock');
const header = document.querySelector('header');
const stockBox = document.querySelector('tbody');

fetchData();

// 每隔 N 秒自动更新数据
// setInterval(fetchData, getRandomTime());

// function getRandomTime() {
//   return Math.random() * 6000 + 2000;
// }

function fetchData() {
  axios
    .get(url)
    .then(response => {
      console.log(response);

      const bkElement = document.querySelector(
        '.bk-son-box  .bg-lightest-blue',
      );
      const bk = bkElement.getAttribute('bk');

      db.find({selector: {_id: getToday}})
        .then(data => {
          const stockArr = data.docs[0].data;
          const sortedArr = stockArr
            .filter(e => e.bkName === bk)
            .sort((a, b) => b.f10 - a.f10);
          const result = template(sortedArr);

          stockBox.innerHTML = result;
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

header.addEventListener('click', e => {
  const target = e.target;

  if (target.tagName.toLowerCase() === 'a') {
    fetchData();
  }
});
