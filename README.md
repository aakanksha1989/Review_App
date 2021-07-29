# Single Page Application to show Reviews (e.g. Adidas)

This application implements the basic functionality for a Review page using basics of React, Redux, JS, ES6 and CSS and media queries.\
Functionality implemented are:

1. Pagination
2. Sorting
3. Filtering by Text

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## More Details of Functionality Implementation

### Proxy Server

This application making API calls to fetch the data from server. But due to 'Same Origin Policy' of browser, the CORS issue occured during the API call. So to tackle this issue, in this we configure the proxy middleware through Express app instance. (setupProxy.js)

1. ### Pagination :

   On loding Review page, 5 latest reviews will shown to the user with an option of (Read more reviews >>), clicking on which next 5 latest reviews will loaded and that along with the previous one will shown to user.\
   Note: Option (Read more reviews>>) is available to user until all available total reviews are not loaded.\
   To implement it we use the API calls and maintain the states in redux store that are responsible for passing the correct request parameters in API call and displaying the correct data on scrren to user.

2. ### Sorting:

   User has option to see the Reviews in sorted manner like Newest, Helpful, Lowest rated, Highest rated.
   Note: To implement it we use the API calls and maintain the states in redux store that are responsible for passing the correct request parameters in API call and displaying the correct data on scrren to user.

3. ### Filtering:
   User has option to apply the filter on the loaded visible reviews by this functionality.
   Note: At a time user can apply only one filter\
   Filter can be toggled i.e. applied or unapplied
