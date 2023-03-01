// Import View Parent Class
import View from "./view.js";

class SearchResultView extends View {
  _parentEl = document.querySelector(".result");
  _SearchInputField = document.querySelector(".search__input");

  //  Recipe Search Results Event Handler - Publisher Pattern
  addSearchResultHandler(handler) {
    this._SearchInputField.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handler(e.target.value.toLowerCase());
      }
    });
  }

  // Recipe Search Results HTML Markup
  _generateMarkUp() {
    this._SearchInputField.value = " ";
    return this._data.map(this._resultMarkUp).join("");
  }

  // HTML Markup with Search Results Dynamic data
  _resultMarkUp(data) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${data.id}">
      <figure class="preview__fig">
        <img src="${data.image}" alt="" />
      </figure>
      <!-- Result Preview Data -->
      <div class="preview__data">
        <h4 class="preview__title">
        ${data.title}
        </h4>
        <p class="preview__publisher">${data.publisher ?? data.likes} Likes</p>
        <!-- <div class="preview__user">Preview User</div> -->
      </div>
    </a>
  </li>
    `;
  }
}

export default new SearchResultView();
