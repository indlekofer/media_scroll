import assert from 'assert';
import store from '@indlekofer/redux-store';
import { GET_SCROLL, REDUCER, config } from '../src/index';

function handleChangeTest(done, x, y, prevX, prevY) {
  const state = store.getState()[REDUCER].get(GET_SCROLL)
  assert.equal(x, state.x);
  assert.equal(y, state.y);
  assert.equal(prevX, state.prevX);
  assert.equal(prevY, state.prevY);
  done();
}
describe('config', () => {
  var unsubscribe;
  beforeEach(() => {
    store.dispatch({type: '@indlekofer/media/TYPE_CHANGE', payload: {key: GET_SCROLL, value: {x: null, y: null, prevX: null, prevY: null}}});
  });

  afterEach(() => {
    unsubscribe();
  });
  
  it('check config', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, null, null, null, null));
    config();
  });
  it('check config', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 100, 200, null, null));
    config(100, 200);
  });
});

