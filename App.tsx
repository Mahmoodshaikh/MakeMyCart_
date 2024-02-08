import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import NavigatorStack from './Navigarors/NavigatorStack'

import { Provider } from 'react-redux';
import Store from './Store/Store'


function App(): React.JSX.Element {
  return (
    <Provider store = {Store}>
    <NavigationContainer>
      <NavigatorStack/>
    </NavigationContainer>
    </Provider>

  );
}
export default App;
