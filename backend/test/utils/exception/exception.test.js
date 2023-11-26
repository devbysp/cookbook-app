const { withExceptionHandling } = require('../../../src/utils');

describe('Aspect oriented exception handling', () => {

  describe('Applying exception handling wrapper', () => {
    const message = 'wrapped error message';
    const MockError = new Error('mock error');

    test(' if wrapper is not applied to a function -> then it throws an exception', () => {
      expect(() => withExceptionHandling({}, message)).toThrow('Not a function');
    });

    test(' if sync function throws an exception -> the causing error gets wrapped inside a new error', () => {
      const wrapped = withExceptionHandling(() => { throw MockError; }, message);
      expect(wrapped).toThrowWithCause(message, MockError);

    });

    test(' if sync function returns a rejected Promise -> the causing error gets wrapped inside a new error', () => {
      const wrapped = withExceptionHandling(
        () => new Promise((accept, reject) => reject(MockError)), 
        message);
      expect(wrapped).toThrowWithCause(message, MockError);

    });

    test(' if sync function returns a value -> the wrapping function returns the same value', async () => {
      const retval = 'return value';
      const wrapped = withExceptionHandling(() => { return retval }, message);
      expect(await wrapped()).toEqual(retval);
    });


    test(' if async function throws an exception -> the causing error gets wrapped inside a new error', () => {
      const wrapped = withExceptionHandling(async () => { throw MockError; }, message);
      expect(wrapped).toThrowWithCause(message, MockError);

    });

    test(' if async function returns a rejected Promise -> the causing error gets wrapped inside a new error', () => {
      const wrapped = withExceptionHandling(
        async () => new Promise((accept, reject) => reject(MockError)), 
        message);
      expect(wrapped).toThrowWithCause(message, MockError);

    });

    test(' if async function returns a value -> the wrapping function returns the same value', async () => {
      const retval = 'return value';
      const wrapped = withExceptionHandling(async () => { return retval }, message);
      expect(await wrapped()).toEqual(retval);
    });

  });
});


expect.extend({
  async toThrowWithCause(received, expectedMessage, expectedCause) {
    if (typeof received !== 'function') {
      throw new Error(`Expected a function, but received ${typeof received}.`);
    }

    try {
      await received();
      return { 
        pass: false,
        message: () => 'Expected the function to throw an error, but it did not.',
      };
    } 
    catch (error) {
      const pass = error?.message === expectedMessage && error?.cause === expectedCause;

      if (pass) {
        return {
          pass: true,
          message: () => `Expected the function to throw an error "${expectedMessage}" with cause "${expectedCause}", and it did.`,
        };
      } 

      else {
        return {
          pass: false,
          message: () => `Expected the function to throw an error "${expectedMessage}" with cause "${expectedCause}", but it had message "${error?.message}"  cause "${error?.cause}".`,
        };
      }
    }

  },
});

