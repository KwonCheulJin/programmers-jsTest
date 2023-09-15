export default class KeywordHistory {
  data = null;
  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement('ul');
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = 'KeywordHistory';
    $target.appendChild($keywordHistory);
    this.onSearch = onSearch;

    this.init();
    this.render();
  }

  init() {
    const data = this.getHistory();
    this.setState(data);
  }

  addKeyword(keyword) {
    let data = this.getHistory();
    data = data.slice(0, 4);
    localStorage.setItem('keywords', JSON.stringify([keyword].concat(data)));
    this.init();
  }

  getHistory() {
    const data = localStorage.getItem('keywords');
    let prev = JSON.parse(data);
    return prev ?? [];
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        keyword => `
        <li>
          <button>
            ${keyword}
          </button>
        </li>
      `
      )
      .join('');

    this.$keywordHistory
      .querySelectorAll('li button')
      .forEach(($item, index) => {
        $item.addEventListener('click', e => {
          this.onSearch(this.data[index]);
        });
      });
  }
}
