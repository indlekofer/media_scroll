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
    config(undefined, null, null, true);
    config(undefined, null, null, true);
  });

  afterEach(() => {
    unsubscribe();
  });
  
  it('check config init', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, null, null, null, null));
    config();
  });
  it('check config values', (done) => {
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, null, null));
    config(undefined, 1, 2);
  });
  it('check config values with prev', (done) => {
    config(undefined, 3, 4);
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, 3, 4));
    config(undefined, 1, 2);
  });
  it('check config values window', (done) => {
    global.window = {pageXOffset: 1, pageYOffset: 2};
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, null, null));
    config(undefined);
  });
  it('check config values event', (done) => {
    global.window = undefined;
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 1, 2, null, null));
    config({pageX: 1, pageY: 2});
  });
  it('check config values force', (done) => {
    global.window = undefined;
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 3, 4, null, null));
    config({pageX: 1, pageY: 2}, 3, 4, true);
  });
  it('check config values event > window', (done) => {
    global.window = {pageXOffset: 1, pageYOffset: 2};
    unsubscribe = store.subscribe(handleChangeTest.bind(null, done, 6, 7, null, null));
    config({pageX: 6, pageY: 7});
  });
});

