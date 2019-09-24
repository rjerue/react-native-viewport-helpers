import * as React from 'react';
import { View } from 'react-native';
import {
  useState,
  useEffect,
  useLayoutEffect,
  EffectCallback,
  useCallback,
} from 'react';
import { observe } from './observer';

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
        observe(ref.current, isVisible, setIsVisible);
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
