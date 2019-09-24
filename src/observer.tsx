import { View } from 'react-native';
import { nativeObserve } from './nativeObserver';

export const observe = (
  ref: Element | View,
  isVisible: boolean,
  setIsVisible: (isVisible: () => boolean) => void
) => {
  nativeObserve(ref as View, isVisible, setIsVisible);
};
