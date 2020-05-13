
function KeysNav() {

  this.lineIndex;
  this.columnIndex;
  this.keyRight;
  this.keyLeft;
  this.keyUp;
  this.keyDown;
  this.selectedClassName;
  this.grid = null;

  this.setGrid = function (matrix) {
    this.grid = matrix;
  }

  this.setup = function (options = {
    lineIndex: 0,
    columnIndex: 0,
    keyLeft: 37,
    keyUp: 38,
    keyRight: 39,
    keyDown: 40,
    selectedClassName: 'selected'
  }) {
    document.onkeydown = this.handleKeyPress;
    this.lineIndex = options.lineIndex;
    this.columnIndex = options.columnIndex;
    this.keyRight = options.keyRight;
    this.keyLeft = options.keyLeft;
    this.keyUp = options.keyUp;
    this.keyDown = options.keyDown;
    this.selectedClassName = options.selectedClassName
  }

  this.removeSelected = function () {
    var current = this.grid[this.lineIndex][this.columnIndex];
    var element = document.getElementById(current);
    var classes = element.classList;
    var newClass = '';
    for (i = 0; i < classes.length; i++) {
      if (classes[i] != this.selectedClassName) {
        newClass += ' ' + classes[i];
      }
    }
    element.className = newClass;
  };

  this.addSelected = function () {
    var target = this.grid[this.lineIndex][this.columnIndex];
    var element = document.getElementById(target);
    element.className += ' ' + this.selectedClassName;
  }

  this.handleKeyPress = function (event) {
    switch (event.keyCode) {
      case this.keyUp:
        this.handleArrowUp();
        break;
      case this.keyDown:
        this.handleArrowDown();
        break;
      case this.keyRight:
        this.handleArrowRight();
        break;
      case this.keyLeft:
        this.handleArrowLeft();
        break;
      default:
        break;
    }
  }.bind(this);

  this.handleArrowUp = function () {
    if (this.lineIndex - 1 < 0) return;
    this.removeSelected();
    this.lineIndex--;
    if (this.columnIndex > this.grid[this.lineIndex].length - 1) this.columnIndex = 0;
    this.addSelected();
  }.bind(this);

  this.handleArrowDown = function () {
    if (this.lineIndex + 1 > this.grid.length - 1) return;
    this.removeSelected();
    this.lineIndex++;
    if (this.columnIndex > this.grid[this.lineIndex].length - 1) this.columnIndex = 0;
    this.addSelected();
  }.bind(this);

  this.handleArrowRight = function () {
    if (this.columnIndex + 1 > this.grid[this.lineIndex].length - 1) return;
    this.removeSelected();
    this.columnIndex++;
    this.addSelected();
  }.bind(this);

  this.handleArrowLeft = function () {
    if (this.columnIndex - 1 < 0) return;
    this.removeSelected();
    this.columnIndex--;
    this.addSelected();
  }.bind(this);

};
