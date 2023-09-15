import DarkModeToggle from './DarkModeToggle.js';
import ImageInfo from './ImageInfo.js';
import Loading from './Loading.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import api from './api.js';

console.log('app is running!');

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.loading.hide();
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem('latestResult', JSON.stringify(result));
  }

  init() {
    const result = localStorage.getItem('latestResult');

    this.setState(JSON.parse(result) ?? []);
  }
}

export default App;
