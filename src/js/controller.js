// Import From model.js
import * as model from "./model.js";

// Import From recipeView.js
import recipeView from "./views/recipeView.js";

// Import From searchResultView.js
import searchResultView from "./views/searchResultView.js";

// Es6 Syntax convert to normal JS
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

/**
 * Control Recipes Render
 * @returns
 */
const controlRecipes = async function () {
  try {
    const ID = window.location.hash.slice(1);
    if (!ID) return;

    // Call renderSpinner Method by recipeView
    recipeView.renderSpinner();

    // Call loadRecipe Method From model & Pass Recipe ID
    await model.loadRecipe(ID);

    // Call render Method by recipeView
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);

    // Call renderError Method by recipeView
    recipeView.renderError();
  }
};

/**
 *Control Recipes Search Results
 * @param query recipe ingredients name
 */
const controlRecipeSearchResult = async function (query) {
  try {
    // Call renderSpinner Method by searchResultView
    searchResultView.renderSpinner();

    // Call loadRecipeSearchResults Method From model & Pass query
    await model.loadRecipeSearchResults(query);

    // Call render Method by searchResultView
    searchResultView.render(model.state.search.results);
  } catch (err) {
    console.error(err);

    // Call renderError Method by recipeView
    recipeView.renderError(err.message);
  }
};

/**
 * Init function to control event handler - Subscribe Pattern
 */
const init = function () {
  // Call addHandlerRender Method From recipeView
  recipeView.addHandlerRender(controlRecipes);

  // Call addSearchResultHandler Method From searchResultView
  searchResultView.addSearchResultHandler(controlRecipeSearchResult);
};

// Init Function Call
init();
