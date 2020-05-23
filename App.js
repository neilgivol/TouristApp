import { createAppContainer } from 'react-navigation';
import firstTimeInIsrael from './funnel/screens/1-firstTimeInIsrael';
import TripType from './funnel/screens/2-tripType';
import FlightsDates from './funnel/screens/3-FlightsDates'
import Budget from './funnel/screens/4-Budget'
import Interest from './funnel/screens/5-Interests'
import MatchScreen from './funnel/screens/6-matchScreen'
import GuideProfile from './funnel/screens/GuideProfile'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './login/src/screens';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import MyProfile from "./tabNavigation/myProfile";
import MainExplore from "./tabNavigation/explore/mainExplore";
import CityExplore from "./tabNavigation/explore/cityExplore";
import Attractions from "./tabNavigation/explore/attractions";


function MyTrip() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Trip!</Text>
    </View>
  );
}
function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat!</Text>
    </View>
  );
}
const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none" >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="firstTimeInIsrael" component={firstTimeInIsrael} />
        <Stack.Screen name="TripType" component={TripType} />
        <Stack.Screen name="FlightsDates" component={FlightsDates} />
        <Stack.Screen name="Budget" component={Budget} />
        <Stack.Screen name="Interest" component={Interest} />
        <Stack.Screen name="MatchScreen" component={MatchScreen} />
        <Stack.Screen name="GuideProfile" component={GuideProfile} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function MyExploreStack() {
  return (
      <ExploreStack.Navigator initialRouteName="MainExplore" headerMode="none" >
        <ExploreStack.Screen name="MainExplore" component={MainExplore} />
        <ExploreStack.Screen name="CityExplore" component={CityExplore} />
        <ExploreStack.Screen name="Attractions" component={Attractions} />
      </ExploreStack.Navigator>
  );
}

 


  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
        <Tab.Navigator
          initialRouteName="MyProfile"
          tabBarOptions={{
            activeTintColor: '#e91e63',
          }}
        >
          <Tab.Screen
            name="MyProfile"
            component={MyProfile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chat" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="MyTrip"
            component={MyTrip}
            options={{
              tabBarLabel: 'My Trip',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="map" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="MyExploreStack"
            component={MyExploreStack}
            options={{
              tabBarLabel: 'Explore',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    );
  }

  export default function App() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
