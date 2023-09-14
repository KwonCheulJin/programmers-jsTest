import DarkModeToggle from './DarkModeToggle.js';
import ImageInfo from './ImageInfo.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import api from './api.js';

console.log('app is running!');

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkModeToggle = new DarkModeToggle({
      $target,
      // onSearch: keyword => {
      //   api.fetchCats(keyword).then(({ data }) => this.setState(data));
      // },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image,
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}

export default App;
