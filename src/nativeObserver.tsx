import { View, Dimensions } from 'react-native';

export const nativeObserve = (
  ref: View,
  wasVisible: boolean,
  setIsVisible: (isVisible: () => boolean) => void
) => {
  (ref as View).measure((_x, _y, width, height, pageX, pageY) => {
    const state = {
      rectTop: pageY,
      rectBottom: pageY + height,
      rectWidth: pageX + width,
    };
    const window = Dimensions.get('screen');
    const isVisible =
      state.rectBottom !== 0 &&
      state.rectTop >= 0 &&
      state.rectBottom <= window.height &&
      state.rectWidth > 0 &&
      state.rectWidth <= window.width;
    if (wasVisible !== isVisible) {
      setIsVisible(() => isVisible);
    }
  });
};
