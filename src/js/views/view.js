// Import Icons
import icons from "url:../../img/icons.svg";

export default class View {
  _errorMessage = "No Recipe Found! Please Try Again!";
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
    const markUp = `
      <div class="error">
        <span>${message}</span>

        <svg class="error__icon">
        <use xlink:href="${icons}#icon-emoji-sad"></use>
      </svg>
      </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  render(data) {
    this._data = data;
    const markUp = this._generateMarkUp();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }

  _clear() {
    this._parentEl.innerHTML = " ";
  }
}
