import assert from 'assert';
import { GET_SCROLL, REDUCER, unset } from '../src/index';

describe('unset', () => {
  beforeEach(() => {
    global.window = undefined;
  });

  it('basic unset', () => {
    unset();
  });
});

