const KeysNav = require('../src');

describe('Testing KeysNav helpers methods', () => {

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

    const event = new KeyboardEvent('keydown', { 'keyCode': 38 });
    document.dispatchEvent(event);

    expect(somethingSpy).toHaveBeenCalled();
    somethingSpy.mockRestore();

  });

  test('should setGrid with provided matrix', () => {

    const keysNav = new KeysNav();
    keysNav.setGrid([[]]);

    expect(keysNav.grid).not.toBeNull();

  });

  test('should setIndexes set lineIndex and columnIndex', () => {

    const keysNav = new KeysNav();
    keysNav.setIndexes(1, 1);

    expect(keysNav.lineIndex).toBe(1);
    expect(keysNav.columnIndex).toBe(1);

  });

});

describe('Testing KeysNav navigation', () => {

  test('should avoid move up when lineIndex equals to 0', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00']];
    keysNav.setGrid(matrix);

    const event = new KeyboardEvent('keydown', { 'keyCode': 38 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  test('should move up and set columnIndex to 0 when above column length is less than current column length', () => {
    document.body.innerHTML = `
      <div id="col00"></div>
      <div id="col10"></div>
      <div id="col11" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00'], ['col10', 'col11']];
    keysNav.setGrid(matrix);
    keysNav.setIndexes(1, 1);

    const event = new KeyboardEvent('keydown', { 'keyCode': 38 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);
    expect(document
      .getElementById('col11')
      .classList
      .contains('selected')
    ).toBe(false);

  });

  test('should move up only', () => {
    document.body.innerHTML = `
      <div id="col00"></div>
      <div id="col10" class="selected"></div>
      <div id="col11"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00'], ['col10', 'col11']];
    keysNav.setGrid(matrix);
    keysNav.setIndexes(1, 0);

    const event = new KeyboardEvent('keydown', { 'keyCode': 38 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);
    expect(document
      .getElementById('col11')
      .classList
      .contains('selected')
    ).toBe(false);

  });

  //

  test('should avoid move down when lineIndex be the last one', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00']];
    keysNav.setGrid(matrix);

    const event = new KeyboardEvent('keydown', { 'keyCode': 40 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  test('should move down and set columnIndex to 0 when bellow column length is less than current column length', () => {
    document.body.innerHTML = `
    <div id="col00"></div>
    <div id="col01" class="selected"></div>
    <div id="col10"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00', 'col01'], ['col10']];
    keysNav.setGrid(matrix);
    keysNav.setIndexes(0, 1);

    const event = new KeyboardEvent('keydown', { 'keyCode': 40 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(1);
    expect(document
      .getElementById('col01')
      .classList
      .contains('selected')
    ).toBe(false);
    expect(document
      .getElementById('col10')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  test('should move down only', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
      <div id="col01"></div>
      <div id="col10"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00', 'col01'], ['col10']];
    keysNav.setGrid(matrix);
    keysNav.setIndexes(0, 0);

    const event = new KeyboardEvent('keydown', { 'keyCode': 40 });
    document.dispatchEvent(event);

    expect(keysNav.lineIndex).toBe(1);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(false);
    expect(document
      .getElementById('col10')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  //

  test('should avoid move right when is on boundaries', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00']];
    keysNav.setGrid(matrix);

    const event = new KeyboardEvent('keydown', { 'keyCode': 39 });
    document.dispatchEvent(event);

    expect(keysNav.columnIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  test('should move right', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
      <div id="col01"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00', 'col01']];
    keysNav.setGrid(matrix);

    const event = new KeyboardEvent('keydown', { 'keyCode': 39 });
    document.dispatchEvent(event);

    expect(keysNav.columnIndex).toBe(1);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(false);
    expect(document
      .getElementById('col01')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  //

  test('should avoid move left when is on boundaries', () => {
    document.body.innerHTML = `
      <div id="col00" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00']];
    keysNav.setGrid(matrix);

    const event = new KeyboardEvent('keydown', { 'keyCode': 37 });
    document.dispatchEvent(event);

    expect(keysNav.columnIndex).toBe(0);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(true);

  });

  test('should move left', () => {
    document.body.innerHTML = `
      <div id="col00"></div>
      <div id="col01" class="selected"></div>
    `;

    const keysNav = new KeysNav();
    const matrix = [['col00', 'col01']];
    keysNav.setGrid(matrix);
    keysNav.setIndexes(0, 1);

    const event = new KeyboardEvent('keydown', { 'keyCode': 39 });
    document.dispatchEvent(event);

    expect(keysNav.columnIndex).toBe(1);
    expect(document
      .getElementById('col00')
      .classList
      .contains('selected')
    ).toBe(false);
    expect(document
      .getElementById('col01')
      .classList
      .contains('selected')
    ).toBe(true);

  });

});
