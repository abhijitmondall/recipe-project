// Import Icons
import icons from "url:../../img/icons.svg";

// Parent View Class
export default class View {
  _data;

  // Render Spinner
  renderSpinner() {
    this._clear();
    const markUp = `
      <div class="spinner">
        <svg class="spinner__icon">
          <use xlink:href="${icons}#icon-spinner3"></use>
        </svg>
      </div>
      `;

    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  // Render Error
  renderError(message = this._errorMessage) {
    this._clear();
    const markUp = `
      <div class="error">
        <span>${message}</span>

        <svg class="error__icon">
        <use xlink:href="${icons}#icon-emoji-sad"></use>
      </svg>
      </div>
      `;
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  // Recipe Render
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    this._clear();
    const markUp = this._generateMarkUp();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  // Recipe Update
  update(data) {
    this._data = data;
    this._clear();
    const markUp = this._generateMarkUp();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  // Clear Parent Element Container
  _clear() {
    this._parentEl.innerHTML = "";
  }
}
