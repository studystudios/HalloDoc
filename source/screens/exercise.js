import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Button, Alert, FlatList} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icona from "react-native-vector-icons/MaterialCommunityIcons"
import Iconb from "react-native-vector-icons/FontAwesome5"
import Iconc from "react-native-vector-icons/Ionicons"
import Icond from "react-native-vector-icons/Entypo"
import Icone from "react-native-vector-icons/Fontisto"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import moment from "moment";

const {Navigator, Screen} = createNativeStackNavigator();

function ExerciseScreen({navigation}) {
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text></Text>
            <Text style={styles.heading}>Exercise Data</Text>
            <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Exercising in day to day life can help us avoid many diseases and illnesses. Tracking and improving exercise can make us fit and healthy.</Text>
            </View>
            <Text></Text>
		<View style={{marginBottom: 10}}>
                <Iconb.Button style={styles.tabContainer} name="walking" onPress={() => navigation.navigate('walkrunscreen')}>
                    <Text style={styles.tabText}>
                        Walking and Running
                    </Text>
                </Iconb.Button>
		</View>
        <View style={{marginBottom: 10}}>
                <Iconc.Button style={styles.tabContainer} name="bicycle" onPress={() => navigation.navigate('cyclingscreen')}>
                    <Text style={styles.tabText}>
                        Cycling
                    </Text>
                </Iconc.Button>
		</View>
        <View style={{marginBottom: 10}}>
                <Iconb.Button style={styles.tabContainer} name="swimmer" onPress={() => navigation.navigate('swimmingscreen')}>
                    <Text style={styles.tabText}>
                        Swimming
                    </Text>
                </Iconb.Button>
		</View>
        <View style={{marginBottom: 10}}>
                <Iconc.Button style={styles.tabContainer} name="fitness" onPress={() => navigation.navigate('cardioscreen')}>
                    <Text style={styles.tabText}>
                        Cardio Fitness
                    </Text>
                </Iconc.Button>
		</View>
        <View style={{marginBottom: 10}}>
                <Icona.Button style={styles.tabContainer} name="run-fast" onPress={() => navigation.navigate('otherexcscreen')}>
                    <Text style={styles.tabText}>
                        Other Exercises
                    </Text>
                </Icona.Button>
		</View>
            </ScrollView>
        </View>
    )
}

function WalkRunScreen({navigation}) {
    const [walktime, setWalktime] = useState(null);
    const [walkcalorie, setWalkcalorie] = useState(null);
    const [walksteps, setWalksteps] = useState(null);
    const [walkdistance, setWalkdistance] = useState(null);
    const [userDataTime, setUserDataTime] = useState(null);
    const [userDataCalorie, setUserDataCalorie] = useState(null);
    const [userDataSteps, setUserDataSteps] = useState(null);
    const [userDataDistance, setUserDataDistance] = useState(null);
    const [timer, setTimer] = useState(null);
    const [calorier, setCalorier] = useState(null);
    const [stepser, setStepser] = useState(null);
    const [distancer, setDistancer] = useState(null);

    const submitWalkRun = async() => {
        if (walktime && walkcalorie && walkdistance && walksteps) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var walktimea = [date + "               " + "-" + "               " + walktime + "min"]
            var walkcaloriea = [date + "               " + "-" + "               " + walkcalorie + "cal"]
            var walkstepsa = [date + "               " + "-" + "               " + walksteps]
            var walkdistancea = [date + "               " + "-" + "               " + walkdistance + "km"]
            var walktimestring = walktimea.toString();
            var walkcaloriestring = walkcaloriea.toString();
            var walkstepsstring = walkstepsa.toString();
            var walkdistancestring = walkdistancea.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    walktimeG: firestore.FieldValue.arrayUnion(Number(walktime)),
                    walkcalorieG: firestore.FieldValue.arrayUnion(Number(walkcalorie)),
                    walkstepsG: firestore.FieldValue.arrayUnion(Number(walksteps)),
                    walkdistanceG: firestore.FieldValue.arrayUnion(Number(walkdistance)),
                    walktimeGT: firestore.FieldValue.arrayUnion(walktimestring),
                    walkcalorieGT: firestore.FieldValue.arrayUnion(walkcaloriestring),
                    walkstepsGT: firestore.FieldValue.arrayUnion(walkstepsstring),
                    walkdistanceGT: firestore.FieldValue.arrayUnion(walkdistancestring)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestWalkRun = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('walkrun').update({
                requestedwalkrun: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserDataSteps(documentSnapshot.data().walkstepsGT);
            setUserDataDistance(documentSnapshot.data().walkdistanceGT);
            setUserDataCalorie(documentSnapshot.data().walkcalorieGT);
            setUserDataTime(documentSnapshot.data().walktimeGT);
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setDistancer(documentSnapshot.data().walkdistanceG);
            setCalorier(documentSnapshot.data().walkcalorieG);
            setTimer(documentSnapshot.data().walktimeG);
            setStepser(documentSnapshot.data().walkstepsG);
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('exercisescreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Walking and Running</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Walking and Running are the two most common exercises. They help increase stamina and control weight.</Text>
                    <Text style={styles.elementInfo}>Regular walking is necessary and tracking it helps to understand and restructure our exercise plan.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Time (in Mins)" onChangeText={(text) => setWalktime(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Calories (in cal)" onChangeText={(text) => setWalkcalorie(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Steps" onChangeText={(text) => setWalksteps(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Distance (in Km)" onChangeText={(text) => setWalkdistance(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitWalkRun}></Button>
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Steps</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={stepser} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Steps Data</Text>
                    <FlatList 
                    data={userDataSteps} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Distance</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={distancer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Distance Data</Text>
                    <FlatList 
                    data={userDataDistance} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Calories</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={calorier} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Calorie Data</Text>
                    <FlatList 
                    data={userDataCalorie} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Time Done</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={timer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Time Data</Text>
                    <FlatList 
                    data={userDataTime} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Walking and Running Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestWalkRun}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function CyclingScreen({navigation}) {
    const [cycletime, setCycletime] = useState(null);
    const [cyclecalorie, setCyclecalorie] = useState(null);
    const [cycledistance, setCycledistance] = useState(null);
    const [userDataTime, setUserDataTime] = useState(null);
    const [userDataCalorie, setUserDataCalorie] = useState(null);
    const [userDataDistance, setUserDataDistance] = useState(null);
    const [timer, setTimer] = useState(null);
    const [calorier, setCalorier] = useState(null);
    const [distancer, setDistancer] = useState(null);

    const submitCycle = async() => {
        if (cyclecalorie && cycledistance && cycletime) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var cycletimea = [date + "               " + "-" + "               " + cycletime + "min"]
            var cyclecaloriea = [date + "               " + "-" + "               " + cyclecalorie + "cal"]
            var cycledistancea = [date + "               " + "-" + "               " + cycledistance + "km"]
            var cycletimestring = cycletimea.toString();
            var cyclecaloriestring = cyclecaloriea.toString();
            var cycledistancestring = cycledistancea.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    cycletimeG: firestore.FieldValue.arrayUnion(Number(cycletime)),
                    cyclecalorieG: firestore.FieldValue.arrayUnion(Number(cyclecalorie)),
                    cycledistanceG: firestore.FieldValue.arrayUnion(Number(cycledistance)),
                    cycletimeGT: firestore.FieldValue.arrayUnion(cycletimestring),
                    cyclecalorieGT: firestore.FieldValue.arrayUnion(cyclecaloriestring),
                    cycledistanceGT: firestore.FieldValue.arrayUnion(cycledistancestring)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestCycle = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('cycle').update({
                requestedcycle: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserDataDistance(documentSnapshot.data().cycledistanceGT);
            setUserDataCalorie(documentSnapshot.data().cyclecalorieGT);
            setUserDataTime(documentSnapshot.data().cycletimeGT);
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setDistancer(documentSnapshot.data().cycledistanceG);
            setCalorier(documentSnapshot.data().cyclecalorieG);
            setTimer(documentSnapshot.data().cycletimeG);
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('exercisescreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Cycling</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Cycling is not just an mode of transport but in this modern world, it is one of the latest equipments for exercise.</Text>
                    <Text style={styles.elementInfo}>Cycling helps to increase height and also burn huge amounts of calories.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Time (in Mins)" onChangeText={(text) => setCycletime(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Calories (in cal)" onChangeText={(text) => setCyclecalorie(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Distance (in Km)" onChangeText={(text) => setCycledistance(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitCycle}></Button>
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Distance</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={distancer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Distance Data</Text>
                    <FlatList 
                    data={userDataDistance} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Calories</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={calorier} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Calorie Data</Text>
                    <FlatList 
                    data={userDataCalorie} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Time Done</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={timer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Time Data</Text>
                    <FlatList 
                    data={userDataTime} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Cycling Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestCycle}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function SwimmingScreen({navigation}) {
    const [swimtime, setSwimtime] = useState(null);
    const [swimcalorie, setSwimcalorie] = useState(null);
    const [userDataTime, setUserDataTime] = useState(null);
    const [userDataCalorie, setUserDataCalorie] = useState(null);
    const [timer, setTimer] = useState(null);
    const [calorier, setCalorier] = useState(null);

    const submitSwim = async() => {
        if (swimcalorie && swimtime) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var swimtimea = [date + "               " + "-" + "               " + swimtime + "min"]
            var swimcaloriea = [date + "               " + "-" + "               " + swimcalorie + "cal"]
            var swimtimestring = swimtimea.toString();
            var swimcaloriestring = swimcaloriea.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    swimtimeG: firestore.FieldValue.arrayUnion(Number(swimtime)),
                    swimcalorieG: firestore.FieldValue.arrayUnion(Number(swimcalorie)),
                    swimtimeGT: firestore.FieldValue.arrayUnion(swimtimestring),
                    swimcalorieGT: firestore.FieldValue.arrayUnion(swimcaloriestring)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestSwim = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('swim').update({
                requestedswim: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserDataCalorie(documentSnapshot.data().swimcalorieGT);
            setUserDataTime(documentSnapshot.data().swimtimeGT);
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setCalorier(documentSnapshot.data().swimcalorieG);
            setTimer(documentSnapshot.data().swimtimeG);
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('exercisescreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Swimming</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Swimming is a sport which requires a lot of stamina and helps maintain the body weight and burn calories.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Time (in Mins)" onChangeText={(text) => setSwimtime(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Calories (in cal)" onChangeText={(text) => setSwimcalorie(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitSwim}></Button>
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Calories</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={calorier} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Calorie Data</Text>
                    <FlatList 
                    data={userDataCalorie} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Time Done</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={timer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Time Data</Text>
                    <FlatList 
                    data={userDataTime} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Swimming Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestSwim}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function CardioScreen({navigation}) {
    const [cardiotime, setCardiotime] = useState(null);
    const [cardiocalorie, setCardiocalorie] = useState(null);
    const [userDataTime, setUserDataTime] = useState(null);
    const [userDataCalorie, setUserDataCalorie] = useState(null);
    const [timer, setTimer] = useState(null);
    const [calorier, setCalorier] = useState(null);

    const submitCardio = async() => {
        if (cardiotime && cardiocalorie) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var cardiotimea = [date + "               " + "-" + "               " + cardiotime + "min"]
            var cardiocaloriea = [date + "               " + "-" + "               " + cardiocalorie + "cal"]
            var cardiotimestring = cardiotimea.toString();
            var cardiocaloriestring = cardiocaloriea.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    cardiotimeG: firestore.FieldValue.arrayUnion(Number(cardiotime)),
                    cardiocalorieG: firestore.FieldValue.arrayUnion(Number(cardiocalorie)),
                    cardiotimeGT: firestore.FieldValue.arrayUnion(cardiotimestring),
                    cardiocalorieGT: firestore.FieldValue.arrayUnion(cardiocaloriestring)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestCardio = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('cardio').update({
                requestedcardio: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserDataCalorie(documentSnapshot.data().cardiocalorieGT);
            setUserDataTime(documentSnapshot.data().cardiotimeGT);
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setCalorier(documentSnapshot.data().cardiocalorieG);
            setTimer(documentSnapshot.data().cardiotimeG);
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('exercisescreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Cardio Fitness</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Intensive exercise done for burning calories, maintaining fitness and weight is called Cardio Fitness.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Time (in Mins)" onChangeText={(text) => setCardiotime(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Calories (in cal)" onChangeText={(text) => setCardiocalorie(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitCardio}></Button>
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Calories</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={calorier} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Calorie Data</Text>
                    <FlatList 
                    data={userDataCalorie} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Time Done</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={timer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Time Data</Text>
                    <FlatList 
                    data={userDataTime} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Cardio Exercises Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestCardio}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function OtherexcScreen({navigation}) {
    const [othertime, setOthertime] = useState(null);
    const [othercalorie, setOthercalorie] = useState(null);
    const [userDataTime, setUserDataTime] = useState(null);
    const [userDataCalorie, setUserDataCalorie] = useState(null);
    const [timer, setTimer] = useState(null);
    const [calorier, setCalorier] = useState(null);

    const submitOther = async() => {
        if (othercalorie && othertime) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var othertimea = [date + "               " + "-" + "               " + othertime + "min"]
            var othercaloriea = [date + "               " + "-" + "               " + othercalorie + "cal"]
            var othertimestring = othertimea.toString();
            var othercaloriestring = othercaloriea.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    othertimeG: firestore.FieldValue.arrayUnion(Number(othertime)),
                    othercalorieG: firestore.FieldValue.arrayUnion(Number(othercalorie)),
                    othertimeGT: firestore.FieldValue.arrayUnion(othertimestring),
                    othercalorieGT: firestore.FieldValue.arrayUnion(othercaloriestring)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestOther = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('other').update({
                requestedother: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserDataCalorie(documentSnapshot.data().othercalorieGT);
            setUserDataTime(documentSnapshot.data().othertimeGT);
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setCalorier(documentSnapshot.data().othercalorieG);
            setTimer(documentSnapshot.data().othertimeG);
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('exercisescreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Other Exercises</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Outdoor sports and many other exercises should also be regularly tracked to check and analyse the fitness of our body.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Time (in Mins)" onChangeText={(text) => setOthertime(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Calories (in cal)" onChangeText={(text) => setOthercalorie(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitOther}></Button>
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Calories</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={calorier} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Calorie Data</Text>
                    <FlatList 
                    data={userDataCalorie} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <Text></Text>
                <Text style={styles.sheading}>Time Done</Text>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={timer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Time Data</Text>
                    <FlatList 
                    data={userDataTime} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <Text></Text>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For all Other Exercises Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestOther}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function App() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="exercisescreen" component={ExerciseScreen}/>
            <Screen name="walkrunscreen" component={WalkRunScreen}/>
            <Screen name="cyclingscreen" component={CyclingScreen}/>
            <Screen name="swimmingscreen" component={SwimmingScreen}/>
            <Screen name="cardioscreen" component={CardioScreen}/>
            <Screen name="otherexcscreen" component={OtherexcScreen}/>
        </Navigator>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393636',
        padding: 18
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
    tabContainer: {
        padding: 20,
        backgroundColor: '#302C2C',
    },
    tabText: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#FFFFFF',
        paddingLeft: 10
    },
    tabBack: {
        width: 45,
        justifyContent: "center"
    },
    heading: {
        fontSize: 32,
        color: '#d9d9d9',
        textAlign: 'center'
    },
    sheading: {
        fontSize: 28,
        color: '#d9d9d9',
        textAlign: 'center'
    },
    containerData: {
        marginLeft: 5,
        marginRight: 5,
        padding: 30,
        borderRadius: 30,
        flex: 1,
        backgroundColor: '#302C2C',
        marginTop: 30
    },
    containerForm: {
        marginLeft: 5,
        marginRight: 5,
        padding: 30,
        borderRadius: 30,
        flex: 1,
        backgroundColor: '#302C2C',
        marginTop: 15
    },
    elementInfo: {
        color: '#a6a6a6',
        fontSize: 18
    },
    subtitle: {
        fontSize: 16,
        color: '#d9d9d9',
        textAlign: "center"
    },
    subtitleb: {
        fontSize: 18,
        color: '#d9d9d9',
        textAlign: "center",
        paddingBottom: 8
    },
    subtitlea: {
        fontSize: 15,
        color: '#d9d9d9',
    },
    input: {
        height: 40,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 24,
        borderWidth: 2,
        borderColor: '#2f4faa',
        padding: 10,
        width: '90%',
        borderRadius: 30
    },
    listdata: {
        color: '#a6a6a6',
        fontSize: 16,
        paddingBottom: 5,
        textAlign: 'center'
    }
})