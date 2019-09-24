import * as React from 'react';
import { View } from 'react-native';
import { EffectCallback } from 'react';
export declare function useIsInViewPortEffect(ref: React.MutableRefObject<View | HTMLDivElement | null>, onVisible?: EffectCallback, dependencies?: any[], disabled?: boolean, delay?: number): boolean;
