import * as React from 'react';
import { View } from 'react-native';
import { EffectCallback } from 'react';
/**
 * Hook to run when ref is in view
 * @param ref Ref to be in view
 * @param onVisible Effect to run when in view
 * @param dependencies Dependencies for the hook
 * @param delay delay to poll on, by default 500ms
 */
export declare function useIsInViewPortEffect(ref: React.MutableRefObject<View | HTMLDivElement | null>, onVisible?: EffectCallback, dependencies?: any[], delay?: number): boolean;
