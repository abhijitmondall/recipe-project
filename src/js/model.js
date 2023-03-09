import { async } from "regenerator-runtime";

// Import From Config
import * as config from "./config.js";

// Import From Helpers
import { getJSON } from "./helpers.js";

/**
 * Store the data - recipes information
 */
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    recipePerPage: config.PER_PAGE_LOAD,
    pageNumber: 1,
  },
  bookmarks: [],
  totalBookmarks: 0,
};

/**
 * Load Recipe by the specific recipe ID
 * @param  ID Get Specific Recipe ID
 */
export const loadRecipe = async function (ID) {
  try {
    // const data = await getJSON(
    //   `${config.API_URL}${ID}/information?apiKey=${config.API_KEY1}`
    // );

    const data = await getJSON(
      `${config.API_URL3}${ID}?key=${config.API_KEY3}`
    );

    let finalData = data;

    // This is a public API so if one public API is crossed the limit then fetch another public API
    // if (data.code === 402) {
    //   const data = await getJSON(
    //     `${config.API_URL}${ID}/information?apiKey=${config.API_KEY2}`
    //   );

    //   if (data.status === "failure")
    //     throw new Error(`${data.message} (${data.code})`);

    //   finalData = data;
    // }

    // const recipe = finalData;

    // state.recipe = {
    //   id: recipe.id + "",
    //   title: recipe.title,
    //   summary: recipe.summary,
    //   likes: recipe.aggregateLikes,
    //   publisher: recipe.sourceName,
    //   sourceUrl: recipe.sourceUrl,
    //   image: recipe.image,
    //   instructions: recipe.instructions,
    //   servings: recipe.servings,
    //   cookingTime: recipe.readyInMinutes,
    //   ingredients: recipe.extendedIngredients,
    // };

    const { recipe } = finalData.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === ID)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Load Recipe Search Results by the recipe ingredients name
 * @param  query recipe ingredients name
 */
export const loadRecipeSearchResults = async function (query) {
  try {
    // const data = await getJSON(
    //   `${config.API_URL2}${query}&number=${config.RECIPE_SEARCH_LIMIT}&apiKey=${config.API_KEY1}`
    // );

    const data = await getJSON(
      `${config.API_URL4}${query}&key=${config.API_KEY3}`
    );

    // state.search.results = data.map((recipe) => {
    //   return {
    //     id: recipe.id + "",
    //     title: recipe.title,
    //     likes: recipe.likes,
    //     image: recipe.image,
    //   };

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    state.search.pageNumber = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.pageNumber) {
  state.search.pageNumber = page;
  const firstPage = (page - 1) * state.search.recipePerPage;
  const lastPage = page * state.search.recipePerPage;

  return state.search.results.slice(firstPage, lastPage);
};

// Store The Data To The Local Storage
const storeBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  localStorage.setItem("totalBookmarks", JSON.stringify(state.totalBookmarks));
};

export const addBookmark = function (recipe) {
  const id = recipe.id + "";
  state.bookmarks.push(recipe);
  state.bookmarks.id += "";
  state.totalBookmarks = state.bookmarks.length;

  if (id === state.recipe.id) state.recipe.bookmarked = true;

  storeBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);

  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  state.totalBookmarks = state.bookmarks.length;
  storeBookmarks();
};

// get The Data From The Local Storage
(() => {
  const storage = localStorage.getItem("bookmarks");
  const total = localStorage.getItem("totalBookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
  if (total) state.totalBookmarks = JSON.parse(total);
})();
