"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.see = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _express = require("express");

var _nodemon = require("nodemon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Create Account"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, username, email, password, password2, location, pageTitle, exists;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;
            pageTitle = "Join";

            if (!(password !== password2)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "Password confirmation does not match"
            }));

          case 5:
            _context.next = 7;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 7:
            exists = _context.sent;

            if (!exists) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "This username/email is already taken."
            }));

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return _User["default"].create({
              name: name,
              username: username,
              email: email,
              password: password,
              location: location
            });

          case 13:
            return _context.abrupt("return", res.redirect("/login"));

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](10);
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: "Upload Video",
              errorMessage: error_message
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 16]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, ok;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pageTitle = "Login";
            _context2.next = 4;
            return _User["default"].findOne({
              username: username,
              socialOnly: false
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "An Account with this username does not exists."
            }));

          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(password, user.password);

          case 9:
            ok = _context2.sent;

            if (ok) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "Wrong password."
            }));

          case 12:
            // initialize
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};

exports.startGithubLogin = startGithubLogin;

var finishGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params);
            _context3.next = 6;
            return (0, _crossFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context3.next = 8;
            return _context3.sent.json();

          case 8:
            tokenRequest = _context3.sent;

            if (!("access_token" in tokenRequest)) {
              _context3.next = 38;
              break;
            }

            //access api
            access_token = tokenRequest.access_token;
            apiUrl = "https://api.github.com";
            _context3.next = 14;
            return (0, _crossFetch["default"])("".concat(apiUrl, "/user"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context3.next = 16;
            return _context3.sent.json();

          case 16:
            userData = _context3.sent;
            console.log(userData);
            _context3.next = 20;
            return (0, _crossFetch["default"])("".concat(apiUrl, "/user/emails"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 20:
            _context3.next = 22;
            return _context3.sent.json();

          case 22:
            emailData = _context3.sent;
            emailObj = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });

            if (emailObj) {
              _context3.next = 26;
              break;
            }

            return _context3.abrupt("return", res.redirect("/login"));

          case 26:
            _context3.next = 28;
            return _User["default"].findOne({
              email: emailObj.email
            });

          case 28:
            user = _context3.sent;

            if (user) {
              _context3.next = 33;
              break;
            }

            _context3.next = 32;
            return _User["default"].create({
              avatarUrl: userData.avatar_url,
              name: userData.name,
              username: userData.login,
              email: emailObj.email,
              password: "",
              socialOnly: true,
              location: userData.location
            });

          case 32:
            user = _context3.sent;

          case 33:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context3.abrupt("return", res.redirect("/"));

          case 38:
            return _context3.abrupt("return", res.redirect("/login"));

          case 39:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function finishGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.finishGithubLogin = finishGithubLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  req.flash("info", "Bye Bye");
  return res.redirect("/");
};

exports.logout = logout;

var getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body3, name, email, username, location, file, updateUser;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, username = _req$body3.username, location = _req$body3.location, file = req.file;
            _context4.next = 3;
            return _User["default"].findByIdAndUpdate(_id, {
              avatarUrl: file ? file.path : avatarUrl,
              name: name,
              email: email,
              username: username,
              location: location
            }, {
              "new": true
            });

          case 3:
            updateUser = _context4.sent;
            req.session.user = updateUser;
            return _context4.abrupt("return", res.redirect("/users/edit"));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Can't change password.");
    return res.redirect("/");
  }

  return res.render("users/change-password", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$session$user2, _id, password, _req$body4, oldPassword, newPassword, newPasswordConfirmation, ok, user;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$session$user2 = req.session.user, _id = _req$session$user2._id, password = _req$session$user2.password, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirmation = _req$body4.newPasswordConfirmation;
            _context5.next = 3;
            return _bcrypt["default"].compare(oldPassword, password);

          case 3:
            ok = _context5.sent;

            if (ok) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("users/change-password", {
              pageTitle: "Change Password",
              errorMessage: "The current password is incorrect"
            }));

          case 6:
            if (!(newPassword !== newPasswordConfirmation)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("users/change-password", {
              pageTitle: "Change Password",
              errorMessage: "The password does not match the confirmation"
            }));

          case 8:
            _context5.next = 10;
            return _User["default"].findById(_id);

          case 10:
            user = _context5.sent;
            // change new password
            user.password = newPassword;
            _context5.next = 14;
            return user.save();

          case 14:
            req.flash("error", "Password updated"); // send notification

            return _context5.abrupt("return", res.redirect("/users/logout"));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var see = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return _User["default"].findById(id).populate("videos");

          case 3:
            user = _context6.sent;
            console.log(user);

            if (user) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("404", {
              pageTitle: "User not found"
            }));

          case 7:
            return _context6.abrupt("return", res.render("users/profile", {
              pageTitle: "".concat(user.name, "'s Profile"),
              user: user
            }));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function see(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.see = see;