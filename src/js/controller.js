// Import Model
import * as model from "./model.js";

// Import Recipe View
import recipeView from "./views/recipeView.js";

// Import Recipe Search Results
import searchResultView from "./views/searchResultView.js";

// Es6 Syntax convert to normal JS
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Show Recipe
const controlRecipes = async function () {
  try {
    const ID = window.location.hash.slice(1);
    if (!ID) return;

    // Search Recipe
    model.loadRecipeSearchResult();

    // Render Spinner
    recipeView.renderSpinner();

    // Load Recipe
    await model.loadRecipe(ID);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlRecipeSearchResult = async function (query) {
  try {
    await model.loadRecipeSearchResult(query);

    searchResultView.renderSpinner();
    searchResultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchResultView.addSearchResultHandler(controlRecipeSearchResult);
};

init();
