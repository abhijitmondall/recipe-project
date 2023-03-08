// Import View Parent Class
import View from "./view.js";

class SearchResultView extends View {
  _parentEl = document.querySelector(".result");
  _searchInputField = document.querySelector(".search__input");
  _errorMessage = "No Recipe Found! Please Try Again!";

  //  Recipe Search Results Event Handler - Publisher Pattern
  searchResultHandler(handler) {
    this._searchInputField.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handler(e.target.value.toLowerCase());
      }
    });
  }

  // Recipe Search Results HTML Markup
  _generateMarkUp() {
    this._searchInputField.value = "";

    return this._data.map(this._resultMarkUp).join("");
  }

  // HTML Markup with Search Results Dynamic data
  _resultMarkUp(data) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview ">
    <a class="preview__link ${
      data.id === id ? "preview__link--active" : " "
    }" href="#${data.id}">
      <figure class="preview__fig">
        <img src="${data.image}" alt="" />
      </figure>
      <!-- Result Preview Data -->
      <div class="preview__data">
        <h4 class="preview__title ${
          data.id === id ? "preview__title--active" : " "
        }">
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
