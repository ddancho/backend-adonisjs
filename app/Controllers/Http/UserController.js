"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const { username, email, password } = request.post();

    try {
      await User.create({ username, email, password });

      return response.created({
        message: "User registered successfully",
      });
    } catch (error) {
      return response.status(500).send({
        message: "User registration failed",
        error,
      });
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.post();

    try {
      const accessTokens = await auth
        .withRefreshToken()
        .attempt(email, password);

      return response.ok({
        message: "User logged in successfully",
        accessTokens,
      });
    } catch (error) {
      return response.status(500).send({
        message: "User login failed",
        error,
      });
    }
  }

  async show({ auth, response }) {
    try {
      const user = await auth.getUser();

      return response.ok({
        message: "User info",
        user,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async newAccessTokens({ request, auth, response }) {
    try {
      const { refreshToken } = request.only(["refreshToken"]);

      const accessTokens = await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken);

      return response.created({
        message: "New access tokens",
        accessTokens,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async revokeToken({ request, auth, response }) {
    try {
      const { refreshToken } = request.only(["refreshToken"]);

      const res = await auth.authenticator("jwt").revokeTokens([refreshToken]);

      const status = res === 1 ? "successfully" : "failed";

      return response.ok({
        message: `Token revoked ${status}`,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async destroy({ request, auth, response }) {
    try {
      const { refreshToken } = request.only(["refreshToken"]);

      await auth.authenticator("jwt").revokeTokens([refreshToken], true);

      return response.ok({
        message: "User logged out successfully",
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }
}

module.exports = UserController;
