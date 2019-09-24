import { __spreadArrays } from "tslib";
import { useState, useEffect, useLayoutEffect, useCallback, } from 'react';
import { observe } from './observer';
/**
 * Hook to run when ref is in view
 * @param ref Ref to be in view
 * @param onVisible Effect to run when in view
 * @param dependencies Dependencies for the hook
 * @param delay delay to poll on, by default 500ms
 */
export function useIsInViewPortEffect(ref, onVisible, dependencies, delay) {
    if (onVisible === void 0) { onVisible = function () { }; }
    if (dependencies === void 0) { dependencies = []; }
    if (delay === void 0) { delay = 500; }
    var _a = useState(null), interval = _a[0], setVPInterval = _a[1];
    var _b = useState(false), isVisible = _b[0], setIsVisible = _b[1];
    var clear = useCallback(function () {
        if (interval) {
            clearInterval(interval);
        }
        setVPInterval(null);
    }, [interval]);
    useLayoutEffect(function () {
        setVPInterval(setInterval(function () {
            if (!ref.current) {
                return;
            }
            observe(ref.current, isVisible, setIsVisible);
        }, delay));
        return clear;
    }, __spreadArrays([ref, delay, isVisible], dependencies));
    useEffect(function () {
        if (isVisible) {
            var effect = onVisible();
            return effect;
        }
    }, [isVisible]);
    return isVisible;
}
//# sourceMappingURL=index.js.map