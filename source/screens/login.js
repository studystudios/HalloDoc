import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, Image, ImageBackground, TouchableOpacity} from "react-native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

function App({navigation}){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const loginUser = 'This user has logged in!'

    const login = async () => {
        if (email && password){
            try {
                const {user} = await auth().signInWithEmailAndPassword(email, password);
                if (user) {
                    await firestore().collection('users').doc(user.uid).update({loginUser})
                }
            } catch (error) {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('The email you have entered is invalid')
                }
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('The password you have entered is incorrect')
                }
                if (error.code === 'auth/user-disabled') {
                    Alert.alert('Your account has been disabled, please contact serathia.darsh@gmail.com for further assistance')
                }
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('No account with given email was found')
                }
                console.log(error)
            }
        } else {
            Alert.alert('Missing Fields!')
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: 'https://i.imgur.com/MwhV8ml.png'}}>
            <Image style={styles.logo} source={{uri: 'https://i.imgur.com/87BIeEk.png'}}></Image>
            <Text></Text>
            <Text></Text>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.subtitle}>We are glad to see you back!</Text>
            <Text></Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} keyboardType="email-address" placeholderTextColor='#a6a6a6' />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} placeholderTextColor='#a6a6a6' />
            <View style={styles.text}>
            <Text style={styles.subtext}>Don't Have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')} style={{marginHorizontal: 5}}>
                    <Text style={{color: 'rgba(81,135,200,1)'}}>Sign Up Here</Text>
                </TouchableOpacity>
            </View>
            <Button title="          Login          " onPress={login} color="#2f4faa"></Button>
            </ImageBackground>
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
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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