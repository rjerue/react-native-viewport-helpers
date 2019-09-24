import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  useState,
  useEffect,
  useLayoutEffect,
  EffectCallback,
  useCallback,
} from 'react';

export const Thing = () => {
  return (
    <View>
      <Text>the snozzberries taste like snozzberries</Text>
    </View>
  );
};

export function useIsInViewPortEffect(
  ref: React.MutableRefObject<View | HTMLDivElement | null>,
  onVisible: EffectCallback = () => {},
  dependencies: any[] = [],
  disabled = false,
  delay = 500
) {
  const [interval, setVPInverval] = useState<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const clear = useCallback(() => {
    if (interval) {
      clearInterval(interval);
    }
    setInterval(null);
  }, []);
  useLayoutEffect(() => {
    if (disabled) {
      return clear;
    }
    setVPInverval(
      setInterval(() => {
        if (!ref.current) {
          return;
        }
        if ((ref.current as View).measure) {
          (ref.current as View).measure((x, y, width, height, pageX, pageY) => {
            const state = {
              rectTop: pageY,
              rectBottom: pageY + height,
              rectWidth: pageX + width,
            };
            const window = Dimensions.get('screen');
            const isVisible =
              state.rectBottom != 0 &&
              state.rectTop >= 0 &&
              state.rectBottom <= window.height &&
              state.rectWidth > 0 &&
              state.rectWidth <= window.width;
            setIsVisible(() => isVisible);
          });
        } else {
          const observer = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                  setIsVisible(() => true);
                } else if (isVisible) {
                  setIsVisible(() => false);
                }
              });
            },
            { threshold: [1] }
          );
          observer.observe(ref.current as HTMLDivElement);
        }
      }, delay)
    );
    return clear;
  }, [ref, disabled, delay, ...dependencies]);

  useEffect(() => {
    if (isVisible) {
      const effect = onVisible();
      return effect;
    }
  }, [isVisible]);
  return isVisible;
}
