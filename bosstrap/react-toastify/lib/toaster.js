'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _EventManager = require('./util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  type: _constant.TYPE.DEFAULT,
  autoClose: null,
  closeButton: null,
  hideProgressBar: null,
  position: null,
  pauseOnHover: null,
  closeOnClick: null,
  className: null,
  bodyClassName: null,
  progressClassName: null,
  transition: null,
  updateId: null
};

var container = null;
var queue = [];
var toastId = 0;

/**
 * Merge provided options with the defaults settings and generate the toastId
 * @param {*} options
 */
function mergeOptions(options, type) {
  return _extends({}, defaultOptions, options, {
    type: type,
    toastId: ++toastId
  });
}

/**
 * Dispatch toast. If the container is not mounted, the toast is enqueued
 * @param {*} content
 * @param {*} options
 */
function emitEvent(content, options) {
  if (container !== null) {
    _EventManager2.default.emit(_constant.ACTION.SHOW, content, options);
  } else {
    queue.push({ action: _constant.ACTION.SHOW, content: content, options: options });
  }

  return options.toastId;
}

var toaster = _extends(function (content, options) {
  return emitEvent(content, mergeOptions(options, options && options.type || _constant.TYPE.DEFAULT));
}, {
  success: function success(content, options) {
    return emitEvent(content, mergeOptions(options, _constant.TYPE.SUCCESS));
  },
  info: function info(content, options) {
    return emitEvent(content, mergeOptions(options, _constant.TYPE.INFO));
  },
  warn: function warn(content, options) {
    return emitEvent(content, mergeOptions(options, _constant.TYPE.WARNING));
  },
  warning: function warning(content, options) {
    return emitEvent(content, mergeOptions(options, _constant.TYPE.WARNING));
  },
  error: function error(content, options) {
    return emitEvent(content, mergeOptions(options, _constant.TYPE.ERROR));
  },
  dismiss: function dismiss() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return container && _EventManager2.default.emit(_constant.ACTION.CLEAR, id);
  },
  isActive: function isActive() {
    return false;
  },
  update: function update(id, options) {
    setTimeout(function () {
      if (container && typeof container.collection[id] !== 'undefined') {
        var _container$collection = container.collection[id],
            oldOptions = _container$collection.options,
            oldContent = _container$collection.content;

        var updateId = oldOptions.updateId !== null ? oldOptions.updateId + 1 : 1;

        var nextOptions = _extends({}, oldOptions, options, {
          toastId: id,
          updateId: updateId
        });
        var content = typeof nextOptions.render !== 'undefined' ? nextOptions.render : oldContent;
        delete nextOptions.render;
        emitEvent(content, nextOptions);
      }
    }, 0);
  }
}, {
  POSITION: _constant.POSITION,
  TYPE: _constant.TYPE
});

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
_EventManager2.default.on(_constant.ACTION.MOUNTED, function (containerInstance) {
  container = containerInstance;

  toaster.isActive = function (id) {
    return container.isToastActive(id);
  };

  queue.forEach(function (item) {
    _EventManager2.default.emit(item.action, item.content, item.options);
  });
  queue = [];
});

exports.default = toaster;