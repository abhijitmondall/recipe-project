// Import Icons
import icons from "url:../../img/icons.svg";

// Import View Parent Class
import View from "./view.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  // Pagination Button Event Handler
  paginationPageHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const checkBTN = e.target.closest(".pagination__btn--action");
      if (!checkBTN) return;

      const targetedPage = +checkBTN.dataset.page;
      handler(targetedPage);
    });
  }

  // Pagination Markup According To The Recipes Per Page
  _generateMarkUp() {
    const totalPageNumber = Math.ceil(
      this._data.results.length / this._data.recipePerPage
    );

    const currentPage = this._data.pageNumber;

    // Above 1 page
    if (currentPage === 1 && totalPageNumber > 1) {
      return `
      <button data-page ="${
        currentPage + 1
      }" class="pagination__btn--action pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="pagination__icon">
        <use
          xlink:href="${icons}#icon-arrow-long-right"
        ></use>
      </svg>
    </button>
      `;
    }

    // Last Page
    if (currentPage === totalPageNumber && totalPageNumber > 1) {
      return `
      <button data-page ="${
        currentPage - 1
      }" class="pagination__btn--action pagination__btn--prev">
      <svg class="pagination__icon">
        <use
          xlink:href="${icons}#icon-arrow-long-left"
        ></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
      `;
    }

    // Page Will Be Between 1 and the Total Page Number
    if (currentPage < totalPageNumber) {
      return `
      <button data-page ="${
        currentPage - 1
      }" class="pagination__btn--action pagination__btn--prev">
        <svg class="pagination__icon">
          <use
            xlink:href="${icons}#icon-arrow-long-left"
          ></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>

      <button data-page ="${
        currentPage + 1
      }" class="pagination__btn--action pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
        <svg class="pagination__icon">
          <use
              xlink:href="${icons}#icon-arrow-long-right"
            ></use>
          </svg>
      </button>
      `;
    }

    // initial page
    return "";
  }
}

export default new PaginationView();
