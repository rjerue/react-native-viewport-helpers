import { createElement, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { View, Text } from 'react-native';
import { nativeObserve } from 'nativeObserver';

var observe = function observe(ref, isVisible, setIsVisible) {
  nativeObserve(ref, isVisible, setIsVisible);
};

var Thing = function Thing() {
  return createElement(View, null, createElement(Text, null, "the snozzberries taste like snozzberries"));
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

export { Thing, useIsInViewPortEffect };
//# sourceMappingURL=react-native-viewport-helpers.esm.js.map
