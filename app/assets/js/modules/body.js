import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import axios from 'axios';
import url from '../url';
import template from './template';

PouchDB.plugin(PouchdbFind);

const header = document.querySelector('header');
const stockBox = document.querySelector('tbody');
const bkSonBox = document.querySelector('.bk-son-box');

var autoFetchID;
var autoFetchAllID;

fetchGenralData();
autoFetchGenralData();

function autoFetchData() {
  clearInterval(autoFetchAllID);
  clearInterval(autoFetchID);

  autoFetchID = window.setInterval(fetchData, getRandomTime());
}

function autoFetchGenralData() {
  clearInterval(autoFetchAllID);
  clearInterval(autoFetchID);

  autoFetchAllID = window.setInterval(fetchGenralData, getRandomTime());
}

// 每隔 N 秒自动更新数据
function getRandomTime() {
  return Math.random() * 3000 + 4000;
}

function fetchData() {
  const xBk = document.querySelector('.x-bk');
  xBk.classList.add('dn');

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
        .sort((a, b) => b.turnOverRateAdd - a.turnOverRateAdd);
      const result = template(sortedArr);

      stockBox.innerHTML = result;

      const xBk = document.querySelectorAll('.x-bk');
      Array.from(xBk).forEach(e => e.classList.add('dn'));
    })
    .catch(err => console.log(err));
}

function fetchGenralData() {
  const xBk = document.querySelector('.x-bk');
  xBk.classList.remove('dn');

  axios
    .get(url)
    .then(response => {
      const stockArr = response.data;
      const sortedArr = stockArr.sort(
        (a, b) => b.turnOverRateAdd - a.turnOverRateAdd,
      );
      const result = template(sortedArr);

      stockBox.innerHTML = result;
    })
    .catch(err => console.log(err));
}

header.addEventListener('click', e => {
  const target = e.target;

  if (target.getAttribute('id') === 'bk-all') {
    bkSonBox.classList.remove('bt');
    autoFetchGenralData();
    return fetchGenralData();
  }

  if (target.tagName.toLowerCase() === 'a') {
    fetchData();
    autoFetchData();
  }
});
