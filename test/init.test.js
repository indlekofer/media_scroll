import assert from 'assert';
import store from '@indlekofer/redux-store';
import { GET_SCROLL, REDUCER, init, unset } from '../src/index';

function handleChangeTest(done, x, y, prevX, prevY) {
  const state = store.getState()[REDUCER].get(GET_SCROLL)
  assert.equal(x, state.x);
  assert.equal(y, state.y);
  assert.equal(prevX, state.prevX);
  assert.equal(prevY, state.prevY);
  done();
}
describe('init', () => {
  var unsubscribe;

  beforeEach(() => {
    global.window = undefined;
    store.dispatch({type: '@indlekofer/media/TYPE_CHANGE', payload: {key: GET_SCROLL, value: {x: null, y: null, prevX: null, prevY: null}}});
  });

  afterEach(() => {
    unsubscribe();
  });
  
  it('check init null', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, null, null, null, null));
    init();
  });
  it('check init', (done) => {
    global.window = {pageXOffset: 1, pageYOffset: 2};
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, null, null));
    init();
  });
});

