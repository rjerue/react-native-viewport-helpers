import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { Dimensions } from 'react-native';

var nativeObserve = function nativeObserve(ref, wasVisible, setIsVisible) {
  ref.measure(function (_x, _y, width, height, pageX, pageY) {
    var state = {
      rectTop: pageY,
      rectBottom: pageY + height,
      rectWidth: pageX + width
    };
    var window = Dimensions.get('screen');
    var isVisible = state.rectBottom !== 0 && state.rectTop >= 0 && state.rectBottom <= window.height && state.rectWidth > 0 && state.rectWidth <= window.width;

    if (wasVisible !== isVisible) {
      setIsVisible(function () {
        return isVisible;
      });
    }
  });
};

var observe = function observe(ref, isVisible, setIsVisible) {
  nativeObserve(ref, isVisible, setIsVisible);
};

function useIsInViewPortEffect(ref, onVisible, dependencies, disabled, delay) {
  if (onVisible === void 0) {
    onVisible = function onVisible() {};
  }

  if (dependencies === void 0) {
    dependencies = [];
  }

  if (disabled === void 0) {
    disabled = false;
  }

  if (delay === void 0) {
    delay = 500;
  }

  var _useState = useState(null),
      interval = _useState[0],
      setVPInverval = _useState[1];

  var _useState2 = useState(false),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var clear = useCallback(function () {
    if (interval) {
      clearInterval(interval);
    }

    setInterval(null);
  }, []);
  useLayoutEffect(function () {
    if (disabled) {
      return clear;
    }

    setVPInverval(setInterval(function () {
      if (!ref.current) {
        return;
      }

      observe(ref.current, isVisible, setIsVisible);
    }, delay));
    return clear;
  }, [ref, disabled, delay].concat(dependencies));
  useEffect(function () {
    if (isVisible) {
      var effect = onVisible();
      return effect;
    }
  }, [isVisible]);
  return isVisible;
}

export { useIsInViewPortEffect };
//# sourceMappingURL=react-native-viewport-helpers.esm.js.map
