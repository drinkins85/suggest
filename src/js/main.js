import '../styles/main.scss';

import PrefixTree from './PrefixTree';
import streets from './data';

const prefixTree = new PrefixTree();
prefixTree.createFromArray(streets);

const input = document.querySelector('.view-stub__input');
const list = document.querySelector('.view-stub__list');

input.addEventListener('focus', () => {
  document.addEventListener('keyup', () => {
    const searchText = input.value;
    if (searchText.length > 2) {
      let suggest = '';
      prefixTree.suggest(input.value).forEach((item) => {
        suggest += `<li class="suggest__item">${streets[item]}</li>`;
      });
      list.innerHTML = suggest;
    }
    if (searchText === '') {
      list.innerHTML = '';
    }
  });
});
