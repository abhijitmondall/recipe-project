import * as RecipeView from "./recipeView";
import View from "./view.js";

class SearchResultView extends View {
  _parentEl = document.querySelector(".result");
  _SearchInputField = document.querySelector(".search__input");

  //  Recipe Search Result Handler Function - Publisher Pattern
  addSearchResultHandler(handler) {
    this._SearchInputField.addEventListener("keyup", function (e) {
      handler(e.target.value.toLowerCase());
    });
  }

  // Search Result Markup Handler
  _generateMarkUp() {
    return this._data.map(this._resultMarkUp).join("");
  }

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
