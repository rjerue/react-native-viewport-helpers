import { Dimensions } from 'react-native';
export var nativeObserve = function (ref, wasVisible, setIsVisible) {
    ref.measure(function (_x, _y, width, height, pageX, pageY) {
        var state = {
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
        };
        var window = Dimensions.get('screen');
        var isVisible = state.rectBottom !== 0 &&
            state.rectTop >= 0 &&
            state.rectBottom <= window.height &&
            state.rectWidth > 0 &&
            state.rectWidth <= window.width;
        if (wasVisible !== isVisible) {
            setIsVisible(function () { return isVisible; });
        }
    });
};
//# sourceMappingURL=nativeObserver.js.map