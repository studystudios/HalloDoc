import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons"
import Profile from '../screens/profile'
import Health from '../screens/health'
import Exercise from '../screens/exercise'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return(
        <Tab.Navigator initialRouteName="Profile" screenOptions={({ route }) => ({headerShown: false, tabBarStyle: {backgroundColor: '#393636'}, tabBarInactiveTintColor: '#a9a9a9'})}>
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle" color={color} size={size} />
            ),
            }}
            />
            <Tab.Screen
            name="Health"
            component={Health}
            options={{
            tabBarLabel: 'Health',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="medkit" color={color} size={size} />
            ),
            }}
            />
            <Tab.Screen
            name="Exercise"
            component={Exercise}
            options={{
            tabBarLabel: 'Exercise',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="barbell" color={color} size={size} />
            ),
            }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab;