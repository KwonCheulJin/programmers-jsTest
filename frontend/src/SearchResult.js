export default class SearchResult {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    const $wrapper = document.createElement('section');
    const $searchResult = document.createElement('ul');
    this.$searchResult = $searchResult;
    this.$searchResult.className = 'SearchResult';
    $target.appendChild($wrapper);
    $wrapper.appendChild($searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
