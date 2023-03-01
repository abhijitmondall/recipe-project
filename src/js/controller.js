// Es6 Syntax convert to normal JS
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Import From model
import * as model from "./model.js";

// Import From recipeView
import recipeView from "./views/recipeView.js";

// Import From searchResultView
import searchResultView from "./views/searchResultView.js";

// Import From paginationView
import paginationView from "./views/paginationView.js";

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

    // Call render Method by recipeView to render recipe
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

    // Call render Method by searchResultView to render search results
    searchResultView.render(model.getSearchResultsPage(1));

    // Call render Method by paginationView to render pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);

    // Call renderError Method by recipeView
    recipeView.renderError(err.message);
  }
};

/**
 * Control Pagination
 * @param pageNumber
 */
const controlPagination = function (pageNumber) {
  /// Call render Method by searchResultView to render search results
  searchResultView.render(model.getSearchResultsPage(pageNumber));

  // Call render Method by paginationView to render pagination button with search updated data
  paginationView.render(model.state.search);
};

/**
 * Init function to control event handler - Subscribe Pattern
 */
const init = function () {
  // Call addHandlerRender Method From recipeView
  recipeView.recipeRenderHandler(controlRecipes);

  // Call addSearchResultHandler Method From searchResultView
  searchResultView.searchResultHandler(controlRecipeSearchResult);

  paginationView.paginationPageHandler(controlPagination);
};

// Init Function Call
init();
