'use strict';

var react = require('react');
var reactNative = require('react-native');

var nativeObserve = function nativeObserve(ref, wasVisible, setIsVisible) {
  ref.measure(function (_x, _y, width, height, pageX, pageY) {
    var state = {
      rectTop: pageY,
      rectBottom: pageY + height,
      rectWidth: pageX + width
    };
    var window = reactNative.Dimensions.get('screen');
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

/**
 * Hook to run when ref is in view
 * @param ref Ref to be in view
 * @param onVisible Effect to run when in view
 * @param dependencies Dependencies for the hook
 * @param delay delay to poll on, by default 500ms
 */

function useIsInViewPortEffect(ref, onVisible, dependencies, delay) {
  if (onVisible === void 0) {
    onVisible = function onVisible() {};
  }

  if (dependencies === void 0) {
    dependencies = [];
  }

  if (delay === void 0) {
    delay = 500;
  }

  var _useState = react.useState(null),
      interval = _useState[0],
      setVPInterval = _useState[1];

  var _useState2 = react.useState(false),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var clear = react.useCallback(function () {
    if (interval) {
      clearInterval(interval);
    }

    setVPInterval(null);
  }, [interval]);
  react.useLayoutEffect(function () {
    setVPInterval(setInterval(function () {
      if (!ref.current) {
        return;
      }

      observe(ref.current, isVisible, setIsVisible);
    }, delay));
    return clear;
  }, [ref, delay, isVisible].concat(dependencies));
  react.useEffect(function () {
    if (isVisible) {
      var effect = onVisible();
      return effect;
    }
  }, [isVisible]);
  return isVisible;
}

exports.useIsInViewPortEffect = useIsInViewPortEffect;
//# sourceMappingURL=react-native-viewport-helpers.cjs.development.js.map
