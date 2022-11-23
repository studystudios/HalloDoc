import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, ImageBackground, Image, TouchableOpacity, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

function App({navigation}){
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [blood, setBlood] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);

    const signUp = async () => {
        if (email && password && name && age && gender && phone && blood && height && weight){
            try {
                const {user} = await auth().createUserWithEmailAndPassword(email, password);
                if(user) {
                    await firestore().collection('users').doc(user.uid).set({name, email, password, age, gender, phone, blood, height, weight});
                }
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('The email is already registered')
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Email entered is invalid')
                }
                if (error.code === 'auth/operation-not-allowed') {
                    Alert.alert('Please report this bug to serathia.darsh@gmail.com and mention error code 001')
                }
                if (error.code === 'auth/weak-password') {
                    Alert.alert('The password entered is weak, please try again with a hard password')
                }
                console.log(error)
            }
        } else {
            Alert.alert('Missing Fields!')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <ImageBackground style={styles.image} source={{uri: 'https://i.imgur.com/MwhV8ml.png'}}>
            <Image style={styles.logo} source={{uri: 'https://i.imgur.com/87BIeEk.png'}}></Image>
            <Text></Text>
            <Text></Text>
            <Text style={styles.heading}>Sign Up</Text>
            <Text style={styles.subtitle}>We are glad to have you with us!</Text>
            <Text></Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => setName(text)} placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} keyboardType="email-address" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Age" onChangeText={(text) => setAge(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Gender (Male/Female/Rather Not Tell)" onChangeText={(text) => setGender(text)} keyboardType="default" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Phone Number" onChangeText={(text) => setPhone(text)} keyboardType="phone-pad" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Blood Group" onChangeText={(text) => setBlood(text)} placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Height (In CMs)" onChangeText={(text) => setHeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Weight (In KGs)" onChangeText={(text) => setWeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} placeholderTextColor='#a6a6a6'/>
            <View style={styles.text}>
            <Text style={styles.subtext}>Having an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')} style={{marginHorizontal: 5}}>
                    <Text style={{color: 'rgba(81,135,200,1)'}}>Login Here</Text>
                </TouchableOpacity>
            </View>
            <Button title="          Sign Up          " onPress={signUp} color="#2f4faa"></Button>
            </ImageBackground>
            </ScrollView>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 32,
        color: '#d9d9d9',
    },
    subtitle: {
        color: '#d9d9d1',
        fontSize: 16
    },
    input: {
        height: 40,
        marginHorizontal: 16,
        marginTop: 24,
        borderWidth: 2,
        borderColor: '#2f4faa',
        padding: 10,
        width: '80%'
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: 20
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
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