// Import Icons
import icons from "url:../../img/icons.svg";
// Import Fraction
import { Fraction } from "fractional";
// Import View
import View from "./view.js";

class RecipeView extends View {
  // Select Parent Element
  _parentEl = document.querySelector(".recipe");

  //  Recipe Render Handler Function - Publisher Pattern
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkUp() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="" class="recipe__img" />
    <h1 class="recipe__title">
      <span> ${this._data.title} </span>
    </h1>
  </figure>

  <!-- Recipe Details Section -->
  <section class="recipe__details">
    <div class="recipe__info recipe__info-left">
      <div class="recipe__cooking-time">
        <svg class="recipe__info-icon recipe__cooking-time-icon">
          <use xlink:href="${icons}#icon-stopwatch"></use>
        </svg>

        <div>
          <span class="recipe__info-data">${this._data.cookingTime}</span>
          <span class="recipe__info-text">Minutes</span>
        </div>
      </div>

      <div class="recipe__servings">
        <svg class="recipe__info-icon recipe__servings-icon">
          <use xlink:href="${icons}#icon-add-user"></use>
        </svg>
        <div>
          <span class="recipe__info-data">${this._data.servings}</span>
          <span class="recipe__info-text">Servings</span>
        </div>
      </div>
    </div>

    <div class="recipe__info recipe__info-right">
      <div class="recipe__bookmark">
        <button class="recipe__bookmark-btn">
          <svg class="recipe__info-icon recipe__bookmark-icon">
            <use
              xlink:href="${icons}#icon-bookmark"
            ></use>
          </svg>
        </button>
      </div>

      <div class="recipe__likes">
        <svg class="recipe__info-icon recipe__likes-icon">
          <use xlink:href="${icons}#icon-thumbs-up"></use>
        </svg>

        <div>
          <span class="recipe__info-data">${this._data.likes ?? "00"}</span>
          <span class="recipe__info-text">Likes</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Recipe Summary Section -->
  <section class="recipe__summary">
    <div class="recipe__summary-content">
      <h2 class="recipe__summary-title">Recipe Summery</h2>
      <p class="recipe__summary-text">
        ${this._data.summary ?? "Not Available"}
      </p>
    </div>
  </section>

  <!-- Recipe Ingredients Section -->
  <section class="recipe__ingredients">
    <div class="recipe__ingredients-content">
      <h2 class="recipe__ingredients-title">Recipe Ingredients</h2>

      <ul class="recipe__ingredients-list">
      ${this._data.ingredients.map(this._recipeIngredientsMarkUp).join("")}

      </ul>
    </div>
  </section>

  <!-- Recipe Cooking Section -->
  <section class="recipe__cook">
    <div class="recipe__cook-content">
      <h2 class="recipe__cook-title">How To Cook It?</h2>

      <p class="recipe__cook-text">
        ${this._data.instructions ?? "Not Available"}
      </p>

      <a href="${
        this._data.sourceUrl
      }" target="_blank" class="recipe__direction-btn" >
        Direction
        <svg class="recipe__direction-icon">
          <use xlink:href="${icons}#icon-direction"></use>
        </svg>
      </a>
    </div>
  </section>
    `;
  }

  _recipeIngredientsMarkUp(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__ingredient-icon">
      <use xlink:href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">
      ${ing.amount ? new Fraction(ing.amount).toString() : " "}
      <span class="recipe__unit">${ing.unit ?? " "}</span>
    </div>
    <div class="recipe__description">${ing.nameClean ?? "Not Available"}</div>
  </li>
    `;
  }
}

export default new RecipeView();
