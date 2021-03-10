# Tic Tac Toe

## Installation

1. `npm install`
2. Rename .env.sample to .env file
3. Paste the AWS link where it says `INSERT AWS LINK HERE`
4. Run the app `npm start`

## General Architecture

The general architecture of this application is going to be monolithic following a client-server pattern. We will follow the conventional folder structure for building a React application. In order to do this, we will create folders that separate business logic concerns. The structure of this will look like this.
• components
• pages
• context
• pages
• services
• utils
In each of these folders, we will group it by features so it can be navigated easily. For example, the Signup page and the Game page are different from one another. We would have this in the pages folder. After I set up the folder structure we should have then I think about what library will be needed to make the application work. I used react-router for helping with keeping the UI in sync with the URL and kept it at the app.js level and makes it easier to reference to go there to add new additional routes.

For the design system, I used Material UI as it can save time in development to make the UI nice and clean. It's preloaded with commonly used components. I also added commonly used libraries like Axios for HTTP requests, lodash as a utility helper, and clsx to help with CSS conditioning logic as it's faster and smaller than the alternative classnames library. For ReactJS, we will use a hook-based pattern as it lets you use functions instead of having to switch between classes, high-order components, and render props. It's also better for minifying than the equivalent code of using classes.

For unit testing, we will go with the standard of using jest and react testing library. It is a very light library to use and I like the guiding principle of having tests resemble the way your software is used.

## Things I Did Not Implement Or Trade-offs

On the signup page, I would spend more time on the authentication flow. There was some missing stuff that would make it great for production use. For example, it would be nice to implement login, forgot password, reset the password, and validation checking. It would be great to add technology like firebase auth or auth0 to handle this.

I also was debating if I should use Redux in the application. I decided not to because I did not have to manage a complex global state yet. By not having this it reduces the amount of boilerplate code in the application. I was also looking into having a custom hook for the tic tac toe game and make it headless by design. We can further separate the business logic and UI. A great example of this is https://react-table.tanstack.com/.

The functionality of having the suggest a move button could have been further enhanced to make moves that can help beat the AI. For example, if the AI was at an advantage then the UI will show visual cues on the exact spot to block the AI from winning. I made the trade-off of showing all available spaces that the player can make as a minimal viable product to start.

For the game page folder, I wished I had more time to add a page to show a selection of games the user can play. It would be great to visually show the user a list of all available games they can play. I was thinking it to have search and pagination to show all web application games. The user would select the game they want to play.
