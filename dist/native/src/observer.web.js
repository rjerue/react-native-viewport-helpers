import { nativeObserve } from './nativeObserver';
export var observe = function (ref, isVisible, setIsVisible) {
    if (ref.measure) {
        nativeObserve(ref, isVisible, setIsVisible);
    }
    else {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(function () { return true; });
                }
                else if (isVisible) {
                    setIsVisible(function () { return false; });
                }
            });
        }, { threshold: [1] });
        observer.observe(ref);
    }
};
//# sourceMappingURL=observer.web.js.map