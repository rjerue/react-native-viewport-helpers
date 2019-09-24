import { __spreadArrays } from "tslib";
import { useState, useEffect, useLayoutEffect, useCallback, } from 'react';
import { observe } from './observer';
export function useIsInViewPortEffect(ref, onVisible, dependencies, disabled, delay) {
    if (onVisible === void 0) { onVisible = function () { }; }
    if (dependencies === void 0) { dependencies = []; }
    if (disabled === void 0) { disabled = false; }
    if (delay === void 0) { delay = 500; }
    var _a = useState(null), interval = _a[0], setVPInverval = _a[1];
    var _b = useState(false), isVisible = _b[0], setIsVisible = _b[1];
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
    }, __spreadArrays([ref, disabled, delay], dependencies));
    useEffect(function () {
        if (isVisible) {
            var effect = onVisible();
            return effect;
        }
    }, [isVisible]);
    return isVisible;
}
//# sourceMappingURL=index.js.map