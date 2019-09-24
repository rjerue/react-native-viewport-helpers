import { View } from 'react-native';
import { nativeObserve } from './nativeObserver';

export const observe = (
  ref: Element | View,
  isVisible: boolean,
  setIsVisible: (isVisible: () => boolean) => void
) => {
  if ((ref as View).measure) {
    nativeObserve(ref as View, isVisible, setIsVisible);
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
    observer.observe(ref as Element);
  }
};
