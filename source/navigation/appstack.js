import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Profile} from '../screens'
const {Navigator, Screen} = createNativeStackNavigator();

function Appstack() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="profile" component={Profile}/>
        </Navigator>
    )
} 

export default Appstack;