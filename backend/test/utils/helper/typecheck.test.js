const { 
  isFunction,
  isAsyncFunction
} = require('../../../src/utils');

describe('Type checking', () => {

  describe('Function', () => {

    test('if the input parameter is a function -> returns true', () => {
      const variable = () => {/* do nothing */};
      expect(isFunction(variable)).toBe(true);
    });

    test('if the input parameter is not a function -> returns false', () => {
      const variable = 'some string';
      expect(isFunction(variable)).toBe(false);
    });

    test('if the input parameter is not a function -> returns false', () => {
      const variable = 'some string';
      expect(isAsyncFunction(variable)).toBe(false);
    });

    test('if the input parameter is an async function -> returns true', () => {
      const variable = async () => {/* do nothing */};
      expect(isAsyncFunction(variable)).toBe(true);
    });

    test('if the input parameter is a sync function -> returns false', () => {
      const variable = () => {/* do nothing */};
      expect(isAsyncFunction(variable)).toBe(false);
    });

    test('if the input parameter is a sync function returning a Promis -> returns false', () => {
      const variable = () => { return new Promise((resolve) => resolve(true)); };
      expect(isAsyncFunction(variable)).toBe(false);
    });

  }); // -------------------------------------------------------------------- //

}); // ====================================================================== //
