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

function HealthScreen({navigation}) {
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text></Text>
            <Text style={styles.heading}>Health Data</Text>
            <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Storing, and analyzing the common and day to day health data's is very useful to diagnose diseases.</Text>
            </View>
            <Text></Text>
		<View style={{marginBottom: 10}}>
                <Icona.Button style={styles.tabContainer} name="human-male-height" onPress={() => navigation.navigate('heightscreen')}>
                    <Text style={styles.tabText}>
                        Height
                    </Text>
                </Icona.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Iconb.Button style={styles.tabContainer} name="weight"  onPress={() => navigation.navigate('weightscreen')}>
                    <Text style={styles.tabText}>
                        Weight
                    </Text>
                </Iconb.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Iconc.Button style={styles.tabContainer} name="body"  onPress={() => navigation.navigate('bmiscreen')}>
                    <Text style={styles.tabText}>
                        Body Mass Index
                    </Text>
                </Iconc.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Iconb.Button style={styles.tabContainer} name="temperature-high"  onPress={() => navigation.navigate('temperaturescreen')}>
                    <Text style={styles.tabText}>
                        Body Temperature
                    </Text>
                </Iconb.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Iconb.Button style={styles.tabContainer} name="heartbeat"  onPress={() => navigation.navigate('heartratescreen')}>
                    <Text style={styles.tabText}>
                        Heart Rate
                    </Text>
                </Iconb.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Icone.Button style={styles.tabContainer} name="blood-drop"  onPress={() => navigation.navigate('bpscreen')}>
                    <Text style={styles.tabText}>
                        Blood Pressure
                    </Text>
                </Icone.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Icond.Button style={styles.tabContainer} name="water"  onPress={() => navigation.navigate('waterscreen')}>
                    <Text style={styles.tabText}>
                        Water Intake
                    </Text>
                </Icond.Button>
		</View>
		<View style={{marginBottom: 10}}>
                <Icond.Button style={styles.tabContainer} name="air"  onPress={() => navigation.navigate('oxyscreen')}>
                    <Text style={styles.tabText}>
                        Oxygen Level
                    </Text>
                </Icond.Button>
		</View>
            </ScrollView>
        </View>
    )
}

function HeightScreen({navigation}) {
    const [height, setHeight] = useState(null);
    const [heighter, setHeighter] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitHeight = async() => {
        if (height) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var heighta = [date + "               " + "-" + "               " + height + "cm"]
            var heightst = heighta.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    heightG: firestore.FieldValue.arrayUnion(Number(height)),
                    height: height,
                    heightGT: firestore.FieldValue.arrayUnion(heightst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestHeight = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('heights').update({
                requestedheight: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().heightGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setHeighter(documentSnapshot.data().heightG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Height</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Tracking the height of a human body can help track the physical growth of a body.</Text>
                    <Text style={styles.elementInfo}>Abnormalities like growth hormone deficiency can also be detected using height data.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Height (in CMs)" onChangeText={(text) => setHeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitHeight}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={heighter} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Height Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Height Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestHeight}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function WeightScreen({navigation}) {
    const [weight, setWeight] = useState(null);
    const [weighter, setWeighter] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitWeight = async() => {
        if (weight) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var weighta = [date + "               " + "-" + "               " + weight + "kg"]
            var weightst = weighta.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    weightG: firestore.FieldValue.arrayUnion(Number(weight)),
                    weight: weight,
                    weightGT: firestore.FieldValue.arrayUnion(weightst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestWeight = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('weights').update({
                requestedweight: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().weightGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setWeighter(documentSnapshot.data().weightG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Weight</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Tracking the weight of body, helps track many other disorders as many health factors are related to weight.</Text>
                    <Text style={styles.elementInfo}>Factors like Cholesterol, Blood Pressure and Blood Sugar are related to weight of the body.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Weight (in KGs)" onChangeText={(text) => setWeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitWeight}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={weighter} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Weight Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Weight Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestWeight}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function BmiScreen({navigation}) {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [bmi, setBmi] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitBmi = async() => {
        if (height && weight) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var manipulate = weight / (height*height);
            var bmia = [date + " " + "-" + " " + manipulate]
            var bmist = bmia.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    bmiG: firestore.FieldValue.arrayUnion(Number(manipulate)),
                    bmiGT: firestore.FieldValue.arrayUnion(bmist)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestBmi = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('bmi').update({
                requestedbmi: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().bmiGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setBmi(documentSnapshot.data().bmiG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Body Mass Index</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Body mass index is a way to measure the nutrition level of one's body.</Text>
                    <Text style={styles.elementInfo}>BMI helps to measure, if the person is well nurished, undernurished or overweight.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Weight (in Kg)" onChangeText={(text) => setWeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Height (in M)" onChangeText={(text) => setHeight(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitBmi}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={bmi} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Body Mass Index Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For BMI Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestBmi}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function TemperatureScreen({navigation}) {
    const [temp, setTemp] = useState(null);
    const [temper, setTemper] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitTemp = async() => {
        if (temp) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var tempa = [date + "               " + "-" + "               " + temp + "C"]
            var tempst = tempa.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    tempG: firestore.FieldValue.arrayUnion(Number(temp)),
                    tempGT: firestore.FieldValue.arrayUnion(tempst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestTemp = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('temp').update({
                requestedtemp: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().tempGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setTemper(documentSnapshot.data().tempG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Body Temperature</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Body Temperature is another important factor related to human body.</Text>
                    <Text style={styles.elementInfo}>High Fever is one of the most common symptoms of various illness.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Temperature (In Celcius)" onChangeText={(text) => setTemp(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitTemp}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={temper} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Temperature Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Temperature Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestTemp}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function HeartRateScreen({navigation}) {
    const [heart, setHeart] = useState(null);
    const [hearter, setHearter] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitHeart = async() => {
        if (heart) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var hearta = [date + "               " + "-" + "               " + heart]
            var heartst = hearta.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    heartG: firestore.FieldValue.arrayUnion(Number(heart)),
                    heartGT: firestore.FieldValue.arrayUnion(heartst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestHeart = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('heart').update({
                requestedheart: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().heartGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setHearter(documentSnapshot.data().heartG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Heart Rate</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Heart is one of the most important oragns of our body and its rythmic beats help us to live alive.</Text>
                    <Text style={styles.elementInfo}>Major Cardiac diseases and minor diseases both can be traced using heart rate data.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Heart Rate" onChangeText={(text) => setHeart(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitHeart}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={hearter} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Heart Rate Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Heart Rate Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestHeart}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function BpScreen({navigation}) {
    const [sys, setSys] = useState(null);
    const [dias, setDias] = useState(null);
    const [syser, setSyser] = useState(null);
    const [diaser, setDiaser] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitBp = async() => {
        if (sys && dias) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var bpa = [date + "      " + "-" + "      " + sys + "/" + dias + " mmHg"]
            var bpst = bpa.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    bpsysG: firestore.FieldValue.arrayUnion(Number(sys)),
                    bpdiasG: firestore.FieldValue.arrayUnion(Number(dias)),
                    bpGT: firestore.FieldValue.arrayUnion(bpst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestBp = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('bp').update({
                requestedbp: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().bpGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setSyser(documentSnapshot.data().bpsysG);
            setDiaser(documentSnapshot.data().bpdiasG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Blood Pressure</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>The blood pressure is the relative pressure of our blood flowing in the blood vessels.</Text>
                    <Text style={styles.elementInfo}>High Blood Pressure is one of the most common illness found in India and to track it, tracking blood pressure data regularly is necessary.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Systolic BP (in mmHg)" onChangeText={(text) => setSys(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <TextInput style={styles.input} placeholder="Diastolic BP (in mmHg)" onChangeText={(text) => setDias(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitBp}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={syser} />
                    </VictoryChart>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#44ce3d"}, parent: {border: "5px solid #ccc"}}} data={diaser} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Blood Pressure Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Blood Pressure Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestBp}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function WaterScreen({navigation}) {
    const [water, setWater] = useState(null);
    const [waterer, setWaterer] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitWater = async() => {
        if (water) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var watera = [date + "               " + "-" + "               " + water + "ml"]
            var waterst = watera.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    waterG: firestore.FieldValue.arrayUnion(Number(water)),
                    waterGT: firestore.FieldValue.arrayUnion(waterst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestWater = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('water').update({
                requestedwater: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().waterGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setWaterer(documentSnapshot.data().waterG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Water</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Water is one of the most important fluids required for our body. It helps in proper circulation and absorption.</Text>
                    <Text style={styles.elementInfo}>Tracking and analyzing how much water you drank can help prevent dehydration.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Water (in mL)" onChangeText={(text) => setWater(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitWater}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={waterer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Water Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Water Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestWater}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function OxyScreen({navigation}) {
    const [oxy, setOxy] = useState(null);
    const [oxyer, setOxyer] = useState(null);
    const [userData, setUserData] = useState(null);

    const submitOxy = async() => {
        if (oxy) {
            var date = moment().utcOffset('+05.30').format('MMM Do YY')
            var oxya = [date + "               " + "-" + "               " + oxy + "%"]
            var oxyst = oxya.toString();
            const user = auth().currentUser
            if (user){
                await firestore().collection('users').doc(user.uid).update({
                    oxyG: firestore.FieldValue.arrayUnion(Number(oxy)),
                    oxyGT: firestore.FieldValue.arrayUnion(oxyst)
                })
                Alert.alert('Data updated!');
            }
        }
    }

    const requestOxy = async() => {
        const user = auth().currentUser
        if (user) {
            await firestore().collection('requests').doc('oxy').update({
                requestedoxy: firestore.FieldValue.arrayUnion(user.uid),
            })
            Alert.alert('Request Created, Data will be sent to registered email ID in 24 Hrs')
        }
    }

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setUserData(documentSnapshot.data().oxyGT)
        })
    }, [])

    useEffect(() => {
        const user = auth().currentUser;
        firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
            setOxyer(documentSnapshot.data().oxyG);
            console.log(userData)
        })
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.tabBack}>
                    <Iconc.Button name="arrow-back-circle" onPress={() => navigation.navigate('healthscreen')}></Iconc.Button>
                </View>
                <Text style={styles.heading}>Oxygen Level</Text>
                <View style={styles.containerData}>
                    <Text style={styles.elementInfo}>Oxygen is used in respiration. It is a gas which is needed by our body to perform each and every action.</Text>
                    <Text style={styles.elementInfo}>Tracking oxygen levels in our body can help track many respiratory illness like the recent COVID-19 disease.</Text>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.subtitle}>Add Data</Text>
                    <TextInput style={styles.input} placeholder="Oxygen Level (in %)" onChangeText={(text) => setOxy(text)} keyboardType="number-pad" placeholderTextColor='#a6a6a6' />
                    <Text></Text>
                    <Button title="  Submit  "  color="#2f4faa" onPress={submitOxy}></Button>
                </View>
                <View>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine style={{data: {stroke: "#c43a31"}, parent: {border: "5px solid #ccc"}}} data={oxyer} />
                    </VictoryChart>
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitleb}>Oxygen Level Data</Text>
                    <FlatList 
                    data={userData} 
                    renderItem={({item}) => <Text style={styles.listdata}>{item}</Text>}
                    />
                </View>
                <View style={styles.containerData}>
                    <Text style={styles.subtitlea}>For Oxygen Level Data List in email, Please click the below button</Text>
                    <Text />
                    <Button title="  Request Data  "  color="#2f4faa" onPress={requestOxy}></Button>
                </View>
            </ScrollView>
        </View>
    )
}

function App() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="healthscreen" component={HealthScreen}/>
            <Screen name="heightscreen" component={HeightScreen}/>
            <Screen name="weightscreen" component={WeightScreen}/>
            <Screen name="bmiscreen" component={BmiScreen}/>
            <Screen name="temperaturescreen" component={TemperatureScreen}/>
            <Screen name="heartratescreen" component={HeartRateScreen}/>
            <Screen name="bpscreen" component={BpScreen}/>
            <Screen name="waterscreen" component={WaterScreen}/>
            <Screen name="oxyscreen" component={OxyScreen}/>
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