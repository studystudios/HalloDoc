import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data())
        })
    }, [])
    
    if (!userData) {
        return null
    } else {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    <View style={{alignSelf: 'center', margin: 20}}>
                        <View style={styles.userImg}>
                            <Image source={{uri: 'https://i.imgur.com/Wceq3H2.png'}} style={styles.image} resizeMode='center' />
                        </View>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.userName}>Name: {userData.name}</Text>
                        <Text style={styles.userName}>Age: {userData.age}</Text>
                        <Text style={styles.userName}>Gender: {userData.gender}</Text>
                        <Text style={styles.userEmail}>Email: {userData.email}</Text>
                        <Text style={styles.userName}>Phone Number: {userData.phone}</Text>
                        <Text style={styles.userName}>Blood Group: {userData.blood}</Text>
                        <Text style={styles.userName}>Height: {userData.height}</Text>
                        <Text style={styles.userName}>Weight: {userData.weight}</Text>
                    <View style={styles.text}>
                        <Text style={styles.subtext}>Want to Sign Out?</Text>
                        <TouchableOpacity onPress={() => auth().signOut()} style={{marginHorizontal: 5}}>
                            <Text style={{color: 'rgba(81,135,200,1)'}}>Sign out here</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View>
        ) 
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393636'
    },
    scrollView: {
        height: '20%',
        width: '100%',
        padding: 0,
        borderWidth: 0,
        borderRadius: 0,
    },
    contentContainer: {
        paddingBottom: 50
    },
    userImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        paddingTop: 50
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    userDetail: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 30,
        borderRadius: 30,
        flex: 1,
        backgroundColor: '#302C2C',
        marginTop: 60
    },
    userName: {
        fontSize: 18,
        color: '#daf1f1',
        margin: 5
    },
    userEmail: {
        fontSize: 18,
        color: '#daf1f1',
        margin: 5
    },
    text: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 8
    },
    subtext: {
        marginHorizontal: 5,
        color: '#a6a6a6'
    }
})