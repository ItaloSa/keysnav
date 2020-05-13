const KeysNav = require('../src');

describe('Testing keysnav', () => {
  test('should run the test suite', () => { });

  test('should initialize with default values', () => {
    const keysNav = new KeysNav();
    expect(keysNav.options).toEqual(
      expect.objectContaining({
        keyLeft: 37,
        keyUp: 38,
        keyRight: 39,
        keyDown: 40,
        selectedClassName: 'selected'
      })
    );
  });

  test('should register handleKeyPress method', () => {

    const somethingSpy = jest
      .spyOn(KeysNav.prototype, 'handleKeyPress')
      .mockImplementation();

    new KeysNav();

    const event = new KeyboardEvent('keydown', {'keyCode': 37});
    document.dispatchEvent(event);

    expect(somethingSpy).toHaveBeenCalled();

  });

  test('should setGrid with provided matrix', () => {

    const keysNav = new KeysNav();
    keysNav.setGrid([[]]);

    expect(keysNav.grid).not.toBeNull();

  });

  test('should setIndexes set lineIndex and columnIndex', () => {

    const keysNav = new KeysNav();
    keysNav.setIndexes(1,1);

    expect(keysNav.lineIndex).toBe(1);
    expect(keysNav.columnIndex).toBe(1);

  });

});
