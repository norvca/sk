import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import axios from 'axios';
import url from '../url';
import template from './template';

PouchDB.plugin(PouchdbFind);

const header = document.querySelector('header');
const stockBox = document.querySelector('tbody');
const bkSonBox = document.querySelector('.bk-son-box');

fetchGenralData();

// 每隔 N 秒自动更新数据
// setInterval(fetchData, getRandomTime());

// function getRandomTime() {
//   return Math.random() * 3000 + 2000;
// }

function fetchData() {
  axios
    .get(url)
    .then(response => {
      const bkElement = document.querySelector(
        '.bk-son-box  .bg-lightest-blue',
      );
      const bk = bkElement.getAttribute('bk');

      const stockArr = response.data;
      const sortedArr = stockArr
        .filter(e => e.bkName === bk)
        .sort((a, b) => b.f10 - a.f10);
      const result = template(sortedArr);

      stockBox.innerHTML = result;
    })
    .catch(err => console.log(err));
}

function fetchGenralData() {
  axios
    .get(url)
    .then(response => {
      const stockArr = response.data;
      const sortedArr = stockArr.sort((a, b) => b.f10 - a.f10);
      const result = template(sortedArr);

      stockBox.innerHTML = result;
    })
    .catch(err => console.log(err));
}

header.addEventListener('click', e => {
  const target = e.target;

  if (target.getAttribute('id') === 'bk-all') {
    bkSonBox.classList.remove('bt');
    return fetchGenralData();
  }

  if (target.tagName.toLowerCase() === 'a') {
    fetchData();
  }
});
