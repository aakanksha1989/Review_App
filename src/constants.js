export const REVIEW_PAGE_SIZE = 5;

export const URL = '/api/models/LDM19/reviews?includeLocales=en*';

/**
 * Gives you all sorting options.
 *
 * @returns {Object} 'keys' used as sort_param passed in API request, 'value' used for text that displayed on UI
 */
export const SORT_OPTIONS = {
  newest: 'Newest',
  helpful: 'Helpful',
  highestRated: 'Highest rated',
  lowestRated: 'Lowest rated',
};

/**
 * Gives you all options to filter the reviews based on text.
 *
 * @returns {Object} 'key' used for text displayed on UI, 'value' used to search the match of text for filtering.
 */
export const TEXT_FILTER = {
  Comfort: ['Comfort', 'Comfy'],
  Satisfaction: ['Satisfacction', 'Satisfied'],
  Color: ['Color'],
  Design: ['Design'],
  Fit: ['Fit'],
};

export const TEXT_FILTER_ARRAY = (() => {
  const obj = { ...TEXT_FILTER };
  for (const key in obj) {
    obj[key] = false;
  }
  return obj;
})();
