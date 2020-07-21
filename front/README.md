# To run the project

`npm install` then `npm start`

# Purpose of the project

Basic login flow using React Hooks and react-cookies to manage offline authentication meaning that if the whole API is down they will still be logged in
but they won't be able to make API calls to see profil information for instance.

Home page is a PrivateRoute, only accessible if you are logged in.

Login page and Register page are public route but you can't access it when you are already logged in.
