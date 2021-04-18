"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "REDUCER", {
  enumerable: true,
  get: function get() {
    return _media.REDUCER;
  }
});
exports["default"] = exports.unset = exports.setup = exports.config = exports.init = exports.GET_SCROLL = void 0;

var _throttle = _interopRequireDefault(require("@indlekofer/throttle"));

var _reduxStore = _interopRequireDefault(require("@indlekofer/redux-store"));

var _media = require("@indlekofer/media");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var GET_SCROLL = '@indlekofer/media_scroll/GET_SCROLL';
exports.GET_SCROLL = GET_SCROLL;
var __isInitialSetup = true;

var init = function init() {
  var x = null,
      y = null;

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
    x = window.pageXOffset;
    y = window.pageYOffset;
  } else {
    x = null;
    y = null;
  }

  config(x, y);
};

exports.init = init;

var config = function config(x, y) {
  var prevX = null,
      prevY = null;

  var state = _reduxStore["default"].getState()[_media.REDUCER].get(GET_SCROLL);

  if (typeof state != 'undefined') {
    prevX = state.x;
    prevY = state.y;
  }

  (0, _media.handleChange)(GET_SCROLL, {
    y: y,
    x: x,
    prevY: prevY,
    prevX: prevX
  });
};

exports.config = config;

var _handleChangeThrottled = (0, _throttle["default"])(init, 50, true);

var setup = function setup() {
  if (!__isInitialSetup) {
    unset();
  }

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
    window.addEventListener('scroll', _handleChangeThrottled);
  }

  init();
  __isInitialSetup = false;
};

exports.setup = setup;

var unset = function unset() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
    window.removeEventListener('scroll', _handleChangeThrottled);
  }

  __isInitialSetup = true;
};

exports.unset = unset;
setup();
var _default = GET_SCROLL;
exports["default"] = _default;