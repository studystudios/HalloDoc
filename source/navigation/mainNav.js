import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import BottomTab from './bottomtab'
import Authstack from './authstack';

function MainNav() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;
    
    if (!user) {
        return (
            <NavigationContainer>
                <Authstack />
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
        )
    }
}

export default MainNav;