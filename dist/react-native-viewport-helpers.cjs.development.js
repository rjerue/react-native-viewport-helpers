'use strict';

var React = require('react');
var reactNative = require('react-native');
var nativeObserver = require('nativeObserver');

var observe = function observe(ref, isVisible, setIsVisible) {
  nativeObserver.nativeObserve(ref, isVisible, setIsVisible);
};

var Thing = function Thing() {
  return React.createElement(reactNative.View, null, React.createElement(reactNative.Text, null, "the snozzberries taste like snozzberries"));
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

  var _useState = React.useState(null),
      interval = _useState[0],
      setVPInverval = _useState[1];

  var _useState2 = React.useState(false),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];

  var clear = React.useCallback(function () {
    if (interval) {
      clearInterval(interval);
    }

    setInterval(null);
  }, []);
  React.useLayoutEffect(function () {
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
  React.useEffect(function () {
    if (isVisible) {
      var effect = onVisible();
      return effect;
    }
  }, [isVisible]);
  return isVisible;
}

exports.Thing = Thing;
exports.useIsInViewPortEffect = useIsInViewPortEffect;
//# sourceMappingURL=react-native-viewport-helpers.cjs.development.js.map
