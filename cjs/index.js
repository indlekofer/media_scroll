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
exports["default"] = exports.unset = exports.setup = exports.config = exports.GET_SCROLL = void 0;

var _throttle = _interopRequireDefault(require("@indlekofer/throttle"));

var _reduxStore = _interopRequireDefault(require("@indlekofer/redux-store"));

var _media = require("@indlekofer/media");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var GET_SCROLL = '@indlekofer/media_scroll/GET_SCROLL';
exports.GET_SCROLL = GET_SCROLL;

var config = function config(e) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var state = _reduxStore["default"].getState()[_media.REDUCER].get(GET_SCROLL);

  var prevX = null,
      prevY = null;

  if (force) {//nothing to do
  } else if (_typeof(e) == 'object') {
    x = e.pageX;
    y = e.pageY;
  } else if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
    x = window.pageXOffset;
    y = window.pageYOffset;
  }

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
var configThrottled = (0, _throttle["default"])(config, 50, true);

var setup = function setup() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') window.addEventListener('scroll', configThrottled);
};

exports.setup = setup;

var unset = function unset() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') window.removeEventListener('scroll', configThrottled);
};

exports.unset = unset;
setup();
config();
var _default = GET_SCROLL;
exports["default"] = _default;