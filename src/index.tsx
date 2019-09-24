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

/**
 * Hook to run when ref is in view
 * @param ref Ref to be in view
 * @param onVisible Effect to run when in view
 * @param dependencies Dependencies for the hook
 * @param delay delay to poll on, by default 500ms
 */
export function useIsInViewPortEffect(
  ref: React.MutableRefObject<View | HTMLDivElement | null>,
  onVisible: EffectCallback = () => {},
  dependencies: any[] = [],
  delay = 500
) {
  const [interval, setVPInterval] = useState<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const clear = useCallback(() => {
    if (interval) {
      clearInterval(interval);
    }
    setVPInterval(null);
  }, [interval]);

  useLayoutEffect(() => {
    setVPInterval(
      setInterval(() => {
        if (!ref.current) {
          return;
        }
        observe(ref.current, isVisible, setIsVisible);
      }, delay)
    );
    return clear;
  }, [ref, delay, isVisible, ...dependencies]);

  useEffect(() => {
    if (isVisible) {
      const effect = onVisible();
      return effect;
    }
  }, [isVisible]);
  return isVisible;
}
