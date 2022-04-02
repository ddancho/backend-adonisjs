"use strict";

const Route = use("Route");

module.exports = () => {
  /*-------------------------- User Controller routes -------------------------------------- */

  /*-------------------------- register route ----------------------------------------------- */
  // access as guest
  // body : username, email, password, password_confirmation
  /*----------------------------------------------------------------------------------------- */
  Route.post("users/register", "UserController.store")
    .middleware("guest")
    .validator("RegisterUser");

  /*-------------------------- login route -------------------------------------------------- */
  // access as guest
  // body : email, password
  // returns access tokens ( refresh token and token)
  /*----------------------------------------------------------------------------------------- */
  Route.post("users/login", "UserController.login")
    .middleware("guest")
    .validator("LoginUser");

  /*----------------------------------------------------------------------------------------- */
  // header ( Authorization : Bearer token )
  // returns user info if token is not expired
  // if expired returns response status 401 (unauthorized)
  /*----------------------------------------------------------------------------------------- */
  Route.get("users/signInUser", "UserController.show").middleware("auth");

  /*----------------------------------------------------------------------------------------- */
  // header ( Authorization : Bearer token )
  // body : refreshToken
  // returns new refresh token and new token
  /*----------------------------------------------------------------------------------------- */
  Route.post("users/newAccessTokens", "UserController.newAccessTokens")
    .middleware("auth")
    .validator("RefreshToken");

  /*----------------------------------------------------------------------------------------- */
  // header ( Authorization : Bearer token )
  // body : refreshToken
  // revokes token , sets as true(1) in database
  // returns success or failed status
  /*----------------------------------------------------------------------------------------- */
  Route.post("users/revokeToken", "UserController.revokeToken")
    .middleware("auth")
    .validator("RefreshToken");

  /*----------------------------------------------------------------------------------------- */
  // header ( Authorization : Bearer token )
  // body : refreshToken
  // delete record in the database, ( true as second argument )
  /*----------------------------------------------------------------------------------------- */
  Route.post("users/logout", "UserController.destroy")
    .middleware("auth")
    .validator("RefreshToken");
};
