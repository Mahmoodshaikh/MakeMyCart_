/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../Store/CartSlice';

import ProductsScreen from '../Screens/ProductsScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import CartIcon from '../Components/CartIcon';
import CartScreen from '../Screens/CartScreen';
import Logout from '../Components/Logout';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';

const NavigatorStack = () => {
  const Stack = createNativeStackNavigator();
  const cartItems = useSelector(selectCartItems);

  return (
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#F1E9FF'},
        headerTintColor: '#8A2BE2',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={({navigation}) => ({
          title: 'Products',
          headerRight: () => <CartIcon cartItems={cartItems} />,
          headerLeft: () => <Logout />,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{title: 'My Cart'}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{title: 'Registration'}}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{title: 'Product Details'}}
      />
    </Stack.Navigator>
  );
};

export default NavigatorStack;
