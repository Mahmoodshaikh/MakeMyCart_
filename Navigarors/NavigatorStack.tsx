import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../Store/CartSlice';

import ProductsScreen from '../Screens/ProductsScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';
import CartIcon from '../Components/CartIcon';
import CartScreen from '../Screens/CartScreen';
import Logout from '../Components/Logout';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import HomeScreen from '../Screens/HomeScreen';
import GenieLogo from '../Components/GenieLogo';
import CategoryTitle from '../Components/CategoryTitle';
import { selectedCategoryTitle } from '../Store/selectedCategorySlice';
import MyOrdersScreen from '../Screens/MyOrdersScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ProfileIcon from '../Components/ProfileIcon';
import LocationIcon from '../Components/LocationIcon';
import LocationScreen from '../Screens/LocationScreen';

const NavigatorStack = () => {
  const Stack = createNativeStackNavigator();
  const cartItems = useSelector(selectCartItems);
  const category = useSelector(selectedCategoryTitle);

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#F1E9FF' },
        headerTintColor: '#FC6736',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => (
            <>
              <CartIcon />
              <LocationIcon />
              <ProfileIcon navigation={navigation} />
            </>
          ),
          headerLeft: () => (
            <>
              <GenieLogo />
            </>
          ),

          headerTitle: () => <CategoryTitle />,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({
          title: 'My Cart',
          headerRight: () => <GenieLogo />,
        })}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ title: 'Registration' }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={() => ({
          title: 'Product Details',
          headerRight: () => <GenieLogo />,
        })}
      />
      <Stack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        options={() => ({
          title: 'My Orders',
          headerRight: () => <GenieLogo />,
        })}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default NavigatorStack;
