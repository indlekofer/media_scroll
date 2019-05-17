import debounce from '@indlekofer/debounce';
import store from '@indlekofer/redux-store';
import { handleChange, REDUCER } from '@indlekofer/media';

export const GET_SCROLL = '@indlekofer/media_scroll/GET_SCROLL';

export const config = (e, x = null, y = null, force = false) => {
  const state = store.getState()[REDUCER].get(GET_SCROLL);
  let prevX = null, prevY = null;
  if (force) {
    //nothing to do
  } else if (typeof e == 'object') {
    x = e.pageX;
    y = e.pageY;
  } else if (typeof window == 'object') {
    x = window.pageXOffset;
    y = window.pageYOffset;
  }

  if (typeof state != 'undefined') {
    prevX = state.x;
    prevY = state.y;
  }
  handleChange(GET_SCROLL, {y, x, prevY, prevX});
};

const configDebounced = debounce(config, 400);

export const setup = () => {
  if (typeof window == 'object') window.addEventListener('scroll', configDebounced);
};

export const unset = () => {
  if (typeof window == 'object') window.removeEventListener('scroll', configDebounced);
};

setup();
config();

export {
  REDUCER
};
export default GET_SCROLL;
