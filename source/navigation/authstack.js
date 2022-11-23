import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Signup, Login} from '../screens'
const {Navigator, Screen} = createNativeStackNavigator();

function Authstack() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="login" component={Login}/>
            <Screen name="signup" component={Signup}/>
        </Navigator>
    )
}

export default Authstack;