# @indlekofer/media_scroll

## Usage

```js
import GET_SCROLL, { REDUCER as MEDIA_REDUCER } from '@indlekofer/media_scroll';

const mapStateToProps = (state) => {
  return {
    mediaScroll: state[MEDIA_REDUCER].get(GET_SCROLL) //mediaScroll -> {y = null, x = null, prevY = null, prevX = null}
  }
}

```

## Function exports

### setup

### unset

### config

## Constant exports

### REDUCER

### GET_SCROLL (default)
