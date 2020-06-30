(function (root, factory) {

  var pluginName = 'KeysNav';

  if (typeof exports === 'object') {
    module.exports = factory(pluginName);
  } else {
    root[pluginName] = factory(pluginName);
  }
}(this, function (pluginName) {

  'use strict';

  var defaults = {
    keyLeft: 37,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40,
    selectedClassName: 'selected'
  };

  /**
   * Merge defaults with user options
   * @param {Object} options User options
   */
  var extend = function (options) {
    var prop;
    var extended = {};
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
        extended[prop] = defaults[prop];
      }
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        extended[prop] = options[prop];
      }
    }
    return extended;
  };

  var addSelected = function (self) {
    var target = self.grid[self.lineIndex][self.columnIndex];
    var element = document.getElementById(target);
    element.classList.add(self.options.selectedClassName);
  };

  var removeSelected = function (self) {
    var current = self.grid[self.lineIndex][self.columnIndex];
    var element = document.getElementById(current);
    element.classList.remove(self.options.selectedClassName);
  };

  var handleArrowUp = function (self) {
    if (self.lineIndex === 0) return;
    removeSelected(self);
    self.lineIndex--;
    if (self.columnIndex > self.grid[self.lineIndex].length - 1) {
      self.columnIndex = 0;
    }
    addSelected(self);
  }

  var handleArrowDown = function (self) {
    if (self.lineIndex + 1 > self.grid.length - 1) return;
    removeSelected(self);
    self.lineIndex++;
    if (self.columnIndex > self.grid[self.lineIndex].length - 1) {
      self.columnIndex = 0;
    }
    addSelected(self);
  };

  var firstNearestNextTo = function (self, side) {
    var max = self.lineIndex;
    for (var verifLineIdx = max; verifLineIdx >= 0; verifLineIdx--) {
      if (side === 1) {
        if (self.grid[verifLineIdx].length - 1 >= self.columnIndex + 1) {
          return [verifLineIdx, self.columnIndex + side];
        }
      } else {
        if (self.columnIndex > 0 && self.columnIndex <= self.grid[verifLineIdx].length - 1) {
          return [verifLineIdx, self.columnIndex + side];
        }
      }
    }
  };

  var handleArrowRight = function (self) {
    var nearestNextTo = firstNearestNextTo(self, +1);
    if (!nearestNextTo) return;
    removeSelected(self);
    self.setIndexes(nearestNextTo[0], nearestNextTo[1]);
    addSelected(self);
  };

  var handleArrowLeft = function (self) {
    var nearestNextTo = firstNearestNextTo(self, -1);
    if (!nearestNextTo) return;
    removeSelected(self);
    self.setIndexes(nearestNextTo[0], nearestNextTo[1]);
    addSelected(self);
  };

  /**
   * Plugin Object
   * @param {Object} options User options
   * @constructor
   */
  function Plugin(options) {
    this.grid = null;
    this.lineIndex = 0;
    this.columnIndex = 0;
    this.customHandlers = {};

    this.options = extend(options);
    this.init();
  }

  /**
   * Plugin prototype
   * @public
   * @constructor
   */
  Plugin.prototype = {
    init: function () {
      document.onkeydown = this.handleKeyPress.bind(this);
      return;
    },
    setGrid: function (matrix) {
      this.grid = matrix;
    },
    setIndexes: function (line, column) {
      this.lineIndex = line;
      this.columnIndex = column;
    },
    handleKeyPress: function (event) {
      var customHandler = this.customHandlers[event.keyCode];
      if (customHandler) {
        customHandler(event);
        return;
      }

      switch (event.keyCode) {
        case this.options.keyUp:
          handleArrowUp(this);
          break;
        case this.options.keyDown:
          handleArrowDown(this);
          break;
        case this.options.keyRight:
          handleArrowRight(this);
          break;
        case this.options.keyLeft:
          handleArrowLeft(this);
          break;
        default:
          break;
      }
    },
    addKeyHandler: function(keyCode, handler) {
      this.customHandlers[keyCode] = handler;
    }
  };
  return Plugin;
}));
