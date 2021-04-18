import throttle from '@indlekofer/throttle';
import store from '@indlekofer/redux-store';
import { handleChange, REDUCER } from '@indlekofer/media';

export const GET_SCROLL = '@indlekofer/media_scroll/GET_SCROLL';

let __isInitialSetup = true;

export const init = () => {
  let x = null, y = null;
  if (typeof window == 'object') {
    x = window.pageXOffset;
    y = window.pageYOffset;
  } else {
    x = null;
    y = null;
  }
  config(x, y);
};

export const config = (x, y) => {
  let prevX = null, prevY = null;
  const state = store.getState()[REDUCER].get(GET_SCROLL);
  if (typeof state != 'undefined') {
    prevX = state.x;
    prevY = state.y;
  }
  handleChange(GET_SCROLL, {y, x, prevY, prevX});
};

const _handleChangeThrottled = throttle(init, 50, true);

export const setup = () => {
  if (!__isInitialSetup) {
    unset();
  }
  if (typeof window == 'object') {
    window.addEventListener('scroll', _handleChangeThrottled);
  }
  init();
  __isInitialSetup = false;
};

export const unset = () => {
  if (typeof window == 'object') {
    window.removeEventListener('scroll', _handleChangeThrottled);
  }
  __isInitialSetup = true;
};

setup();

export {
  REDUCER
};
export default GET_SCROLL;
