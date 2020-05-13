(function (root, factory) {

  var pluginName = 'KeysNav';

  if (typeof define === 'function' && define.amd) {
    define([], factory(pluginName));
  } else if (typeof exports === 'object') {
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

  /**
   * Helper Functions
   @private
   */
  var privateFunction = function () {
    // Helper function, not directly acessible by instance object
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
    setGrid: function(matrix) {
      this.grid = matrix;
    },
    setIndexes: function(line, column) {
      this.lineIndex = line;
      this.columnIndex = column;
    },
    handleKeyPress: function(event) {
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
    }
  };
  return Plugin;
}));


/**************
  EXAMPLE:
**************/

//// create new Plugin instance
// var pluginInstance = new PluginNameHere({
//     selector: ".box",
//     someDefaultOption: 'foo2',
//     classToAdd: "custom-new-class-name",
// })

//// access public plugin methods
// pluginInstance.doSomething("Doing Something Else")
