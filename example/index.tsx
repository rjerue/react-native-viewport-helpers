import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useIsInViewPortEffect } from '../src/';
import { useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';

const App = () => {
  const arr = new Array(100).fill(1);
  return (
    <ScrollView>
      {arr.map((e, i) => (
        <div key={`key${i}`}>{i}</div>
      ))}
      <Component />
      {arr.map((e, i) => (
        <div key={`key${i}`}>{i}</div>
      ))}
    </ScrollView>
  );
};

const Component = () => {
  const ref = useRef<any>(null);
  useIsInViewPortEffect(
    ref,
    () => {
      console.log('Hello World');
      return () => {
        console.log('goodbye!');
      };
    },
    [],
    2000
  );
  return (
    <View ref={ref}>
      <Text>Hello</Text>
    </View>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
