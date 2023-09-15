export default class SearchResult {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('section');
    const $searchResult = document.createElement('ul');
    this.$searchResult = $searchResult;
    this.$searchResult.className = 'SearchResult';
    $target.appendChild($wrapper);
    $wrapper.appendChild($searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item => {
      if (item.isIntersecting) {
        item.target.querySelector('img').src =
          item.target.querySelector('img')?.dataset.src;

        let dataIndex = item.target.dataset.index;
        if (+dataIndex + 1 === this.data.length - 1) {
          this.onNextPage();
        }
      }
    });
  });

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src='https://via.placeholder.com/200x300' data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}
