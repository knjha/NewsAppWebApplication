// const API_DOMAIN = "https://linesnews.onrender.com/api/news-datas";
const API_SEARCH_DOMAIN = "https://linesnews.onrender.com/api/news-datas?category=";
// const API_KEY = "5bc9caafaebb421ba16dbe71be7a582d";
export const endpointPath = (categoryFull) =>
  `${API_SEARCH_DOMAIN}${categoryFull}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}`;


  