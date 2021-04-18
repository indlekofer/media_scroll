import assert from 'assert';
import store from '@indlekofer/redux-store';
import { GET_SCROLL, REDUCER, setup, unset } from '../src/index';

function handleChangeTest(done, x, y, prevX, prevY) {
  const state = store.getState()[REDUCER].get(GET_SCROLL)
  assert.equal(x, state.x);
  assert.equal(y, state.y);
  assert.equal(prevX, state.prevX);
  assert.equal(prevY, state.prevY);
  done();
}

describe('setup', () => {
  var unsubscribe, addListeners, remListeners;

  beforeEach(() => {
    store.dispatch({type: '@indlekofer/media/TYPE_CHANGE', payload: {key: GET_SCROLL, value: {x: null, y: null, prevX: null, prevY: null}}});
    addListeners = {scroll: 0};
    remListeners = {scroll: 0};
    global.window = {
      pageXOffset: 1,
      pageYOffset: 2,
      addEventListener: function (listener) {addListeners[listener]++},
      removeEventListener: function (listener) {remListeners[listener]++}
    };
  });

  afterEach(() => {
    unsubscribe();
    unset();
  });
  
  it('basic setup should init', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, null, null));
    setup();
    assert.equal(1, addListeners.scroll);
    assert.equal(0, remListeners.scroll);
  });

  it('multiple setup should init again', (done) => {
    setup();
    assert.equal(1, addListeners.scroll);
    assert.equal(0, remListeners.scroll);

    global.window.pageXOffset = 3;
    global.window.pageYOffset = 4;
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 3, 4, 1, 2));
    setup();
    assert.equal(2, addListeners.scroll);
    assert.equal(1, remListeners.scroll);
  });
});

