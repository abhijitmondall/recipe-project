import { async } from "regenerator-runtime";

// Import From Config
import { TIMEOUT_SEC } from "./config.js";

/**
 * Get Rejected Promise with specific seconds
 * @param sec
 * @returns Rejected Promise
 */
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout! Please try again!"));
    }, sec * 1000);
  });
};

/**
 * HTTP Request Helper Function
 * @param  url API URL
 * @returns data
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
