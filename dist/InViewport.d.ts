import { Component } from 'react';
import { View } from 'react-native';
export interface InViewPortProps {
    disabled?: boolean;
    onChange?: (isVisible: boolean) => void;
    delay?: number;
}
interface inViewPortState {
    rectBottom?: number;
    rectTop?: number;
    rectWidth?: number;
}
export declare class InViewPort extends Component<InViewPortProps, inViewPortState> {
    lastValue: boolean;
    interval: any;
    myview: View;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    startWatching(): void;
    stopWatching(): void;
    isInViewPort(): void;
    render(): JSX.Element;
}
export {};
