// Import View Parent Class
import View from "./view.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__lists");
  _resultEl = document.querySelector(".result");
  _bookmarksTotal = document.querySelector(".bookmarks--total");
  _errorMessage = "No Bookmarks Found! Find & Bookmark Your Favorite Recipe!";

  totalBookmarks(data) {
    this._bookmarksTotal.textContent = data;
  }

  addHandlerBookmarks(handler) {
    window.addEventListener("load", handler);
  }

  // Recipe Search Results HTML Markup
  _generateMarkUp() {
    return this._data.map(this._resultMarkUp).join("");
  }

  // HTML Markup with Search Results Dynamic data
  _resultMarkUp(data) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
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

export default new BookmarksView();
