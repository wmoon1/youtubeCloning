"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/logout", _middlewares.protectorMiddleware, _userController.logout);
userRouter.route("/edit").all(_middlewares.protectorMiddleware).get(_userController.getEdit).post(_middlewares.avatarUpload.single("avatar"), _userController.postEdit);
userRouter.route("/change-password").all(_middlewares.protectorMiddleware).get(_userController.getChangePassword).post(_userController.postChangePassword);
userRouter.get("/github/start", _middlewares.publicOnlyMiddleware, _userController.startGithubLogin);
userRouter.get("/github/finish", _middlewares.publicOnlyMiddleware, _userController.finishGithubLogin);
userRouter.get("/:id", _userController.see);
var _default = userRouter;
exports["default"] = _default;