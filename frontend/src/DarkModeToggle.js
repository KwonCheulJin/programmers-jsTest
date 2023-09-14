export default class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $wrapper = document.createElement('section');
    const $darkModeToggle = document.createElement('input');
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = 'checkbox';

    $darkModeToggle.className = 'DarkModeToggle';
    $target.appendChild($wrapper);
    $wrapper.appendChild($darkModeToggle);

    $darkModeToggle.addEventListener('change', e => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.$darkModeToggle.checked = this.isDarkMode;

    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      'color-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }
}
