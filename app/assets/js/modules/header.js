const bkMonBox = document.querySelector('.bk-mon-box');
const bkSonBox = document.querySelector('.bk-son-box');
const allBkMon = document.querySelectorAll('.bk-mon');
const allBkSon = document.querySelectorAll('.bk-son');
const items = document.querySelectorAll('div.bk-son-box .pv2');

headerInit();

bkMonBox.addEventListener('click', e => {
  if (e.target.classList.contains('bk-mon')) {
    bkSonBox.classList.add('bt');
    allBkMon.forEach(e => e.classList.remove('bg-lightest-blue'));
    allBkSon.forEach(e => e.classList.add('dn'));
    e.target.classList.add('bg-lightest-blue');

    const targetId = e.target.getAttribute('id');
    const bk = document.querySelector(`.${targetId}`);
    bk.classList.remove('dn');
    items.forEach(e => e.classList.remove('bg-lightest-blue'));
    bk.children[0].classList.add('bg-lightest-blue');
  }
});

bkSonBox.addEventListener('click', e => {
  items.forEach(e => e.classList.remove('bg-lightest-blue'));

  if (e.target.classList.contains('pv2')) {
    e.target.classList.add('bg-lightest-blue');
  }
});

function headerInit() {
  allBkSon.forEach(e => e.classList.add('dn'));
  bkSonBox.classList.remove('bt');

  // allBkSon[0].classList.remove('dn');
}
