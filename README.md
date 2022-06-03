# TNC Calculator App

This is the TNC Version of the Cool Climate Carbon Calculator. Created during the Fall of 2021 at UC Berkeley. 

                                Containier.js
                              /       |       \   ResultsChart
                             /        |        \     /|\ 
                            /         |         \     | (toggles)
            CarbonCalculator.js   Intro.js    CCgraph.js
                  |  
                  |  
                  |
                  |
              CalcPages  ------- Contain (Custom Assets)
                     
## Get Started

To start working on the app:

1. Clone this repository
2. Clone the repository `calculator-api` from [CoolClimateNetwork/calculator-api](https://github.com/CoolClimateNetwork/calculator-api/)
   1. If you find this repository not found, ask Chris to add you to the organization.
   2. Make sure this `calculator-api` package is installed in the same folder as this `tnc` package. This means you would have a parent directory probably called `coolclimate`, and two directories `calculator-api` and `tnc` inside the `coolclimate` directory.
3. `cd` into `coolclimate-api` directory and run `npm install` => `npm run build`
4. `cd` into `tnc` directory and run `npm install`
5. Now you can run `npm run start` to start serving the frontend

## Relavent Links

Web-Mock-Up:
https://projects.invisionapp.com/share/6TY2U0GUX2F#/425168867_CC_-_Get_Started

Mobile-Mock-Up:
https://www.figma.com/file/3qYdQMz3HDH7YVNizWql6S/Carbon-Calculator

Cool-Climate-API:
https://api-central.berkeley.edu/api/11

React-Hooks:
https://reactjs.org/docs/hooks-intro.html

## Structure

### Containier.scss

SCSS file for all of Calculator files. File is split up accordingly to section.

### Containier.js

Container.js contains the Container Function which renders a React Component that will hold all of the the TNC Calculator global states as well as the API function calls. This Component is IMPORTANT as any react hooks that change the global state should be passed downstream from here.


#### CarbonCalculator.js

CarbonCalculator.js is the wrapper that loads all the different pages to dispaly for the user.

#### CCgraph.js

Graph that is shown to the right of the Carbon Calculator when going through the process of entering items into the calculator.

#### Intro.js

Renders the text that is shown at teh start of starting the calculator.

#### ResultsChart

This is the full-size chart that is only shown when you want to toggle it. Overlay is presented when viewing it and makes CarbonCalculator unclickable.

#### pages

Holds all the different pages that the CarbonCalculator renders.

#### customAssets

This holds all the custom UI components such as dropdown menu and slider bars that deviate from their orginal representation

#### svgs

This holds all the several SVG's used throughout the project.

#### components

This holds all other compoents that arent pages, custom assets or the container itself e.g. resultschart

## Data Flow

The crux of the website works by having 3 objects stored in container.js. An Input Object, A Result Object, and a Baseline Object:
Input Object: This is the object that is always passed to the API call and is never modified directly. We change it in the following manner:
1: We pass down the input object to each of the Calculator pages. 
2: Each Calculator page creates a local copy of the input object and modifies it in accordance to user input
3: Once the user is done working on a local page,(By moving to a new page) We set the old input object in the container.js file to now point to the new modified local copy.
4: A hook in container.js is set to call to the API anytime the input object is changed so anytime we switch calc pages we API call. 

Result Object: This is the object that stores whatever the most recent API call returned.

Baseline Object: The first Result Object that the API call returned to compare against subsequent API calls.



## Misc

### Outside NPM packages

The only outside dependecies within the project are the  packages: 

https://www.npmjs.com/package/lodash 

https://www.npmjs.com/package/sass


## TO-DO (BUG FIXES)

### Location Input:

Currently only Zip Code inputs are allowed for the calculator input. To allow for City, State, etc... regex and API parsing needs to be implemented within the front end.

### Form Validation:

A way to ensure that only valid inputs are accepted when users are entering their data.

### Home API discrepency:

The values from the intial API call and subsequent API calls for footprint_housing values differ slighly causing there to be a noticed change without any user input.

### Food Input Bias:

There is a multipiler that isn't being used correctly when Food inputs are being calculated (This might be a realy easy fix that is written in documentation somewhere). Currently the input values are calculated by having default values multiplied by serving size.

### Tooltip for bar charts:

There needs to be a number displayed when a user hovers over barcharts. See figma file for more information.

### API calls :

A bug occurs sometimes where there are too many API calls at the same time causing unpredictable behavior. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
