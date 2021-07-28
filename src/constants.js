export const REVIEW_PAGE_SIZE = 5; //number of reviews fetched by API

//sorting options 'key' as sort_param passed in API request, 'value' as text that displayed on UI
export const SORT_OPTIONS = {
  newest: "Newest",
  helpful: "Helpful",
  highestRated: "Highest rated",
  lowestRated: "Lowest rated",
};

//filtering options 'key' used for text displayed on UI, 'value' used to search the match of text for filtering.
export const TEXT_FILTER = {
  Comfort: ["Comfort", "Comfy"],
  Satisfaction: ["Satisfacction", "Satisfied"],
  Color: ["Color"],
  Design: ["Design"],
  Fit: ["Fit"],
};

//object that used as a state to maintain the text filter. 
export const TEXT_FILTER_ARRAY = (() => {
  const obj = { ...TEXT_FILTER };
  for (const key in obj) {
    obj[key] = false;
  }
  return obj;
})();
