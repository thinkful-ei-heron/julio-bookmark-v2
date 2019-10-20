import bookmark from './bookmark.js';
function main() {
  bookmark.loadData();
  bookmark.bindEventListeners();
}
$(main);
