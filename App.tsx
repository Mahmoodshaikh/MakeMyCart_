import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import NavigatorDrawer from './Navigarors/NavigatorStack'

import { Provider } from 'react-redux';
import Store from './Store/Store'


function App(): React.JSX.Element {
  return (
    <Provider store = {Store}>
    <NavigationContainer>
      <NavigatorDrawer/>
    </NavigationContainer>
    </Provider>

  );
}
export default App;
