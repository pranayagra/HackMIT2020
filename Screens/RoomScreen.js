import React, {useState} from 'react';
import { StyleSheet, Image, View, ScrollView, Text, SafeAreaView } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { material } from 'react-native-typography';
import styled from 'styled-components/native';

import {createRoom, checkForRoom} from '../util/firebaseUtil';

import firestore from '../firebase';
import firebase from 'firebase';
// import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        // flex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: 50,
    },
    buttonStyle: {
        borderRadius: 10,
    },

    createContainer: {
        marginBottom: 70,
        width: "60%",
    },
    // createRoomWrapper: {
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "baseline"
    // },

    joinContainer: {
        width: "60%",
    },
    inputContainerStyle: {
        height: 60,
        maxHeight: 60,
        marginBottom: 30,
    },
});

export default function Login({navigation}) {
    const [newRoom, setNewRoom] = useState("");
    const [roomID, setRoomID] = useState("");
    // let channelID = shortid.generate().substring(0, 4);
    let channelID = "hack";
    
    const [visible, setVisible] = React.useState(false);

    const generateRoom = () => {
        setNewRoom(createRoom());
        setVisible(true);
    }

    const joinRoom = () => {
        if (checkForRoom(roomID)) {
            navigation.navigate("VideoScreen", {
                channel: channelID,
            });
        } else {
            alert("Invalid room!")
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container} scrollEnabled={true} contentContainerStyle={{
                alignItems: 'center', 
                justifyContent: 'center',
                flexGrow: 0.45,
            }}>
                <Image style={[styles.logo, styles.marginBox]} source={require("../assets/images/icon.png")} />
                <View style={[styles.createContainer]}>
                    <Button mode="contained" style={styles.buttonStyle} onPress={generateRoom}>
                        Create Room
                    </Button>
                    <Modal visible={visible} backdropColor="black" backdropOpacity={1} onBackdropPress={() => {
                            setVisible(false);
                            navigation.navigate('VideoScreen', {
                                channel: channelID,
                            });
                        }}>
                        <View style={styles.createRoomContainer}>
                            <Text>We've created a new room! Copy the code below and share it with someone</Text>
                            <Text>{roomID}</Text>
                            <IconButton
                                icon="content-copy"
                            />
                        </View>
                    </Modal>
                </View>
                <View style={styles.joinContainer}>
                    <TextInput
                        style={styles.inputContainerStyle}
                        label="Room ID"
                        placeholder="Room ID"
                        onChangeText={(text) => setRoomID(text)}
                    />
                    <Button mode="contained" style={styles.buttonStyle} onPress={joinRoom}>
                        Join Room
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

    // const navigationOptions = {
    //     headerTitle: (
    //         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //             <Text style={material.body2}>TeleHuggies!</Text>
    //             <Text style={[material.caption, { fontSize: 10 }]}>Register</Text>
    //         </View>
    //     )
    // };
    
    // const [firstName, useFirstName] = useState("");
    // const [lastName, useLastName] = useState("")
    // const [email, useEmail] = useState("")
    // const [password, usePassword] = useState("")
    // const [errorMessage, useErrorMessage] = useState("")

    // register = async () => {
    //     email = this.state.email;
    //     password = this.state.password;
    //     await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //         this.setState({ errorMessage });
    //     });
    //     name = this.state.firstName;
    //     const collRef = firestore.collection(name);
    //     this.props.navigation.navigate('Home', {
    //         name: name,
    //     });
    // }

    // onChangeFirstName = firstName => {
    //     this.setState({ firstName });
    // }

    // onChangeLastName = lastName => {
    //     this.setState({ lastName });
    // }

    // onChangeEmail = email => {
    //     this.setState({ email });
    // }

    // onChangePassword = password => {
    //     this.setState({ password });
    // }

    // return (
    //     <SafeAreaView style={styles.container}>
    //         <Image style={[styles.image, styles.marginBox]} source={require("../TeleHuggies.png")} />
    //         <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>First Name</Text>
    //         <TextInput
    //             style={[styles.textInput, styles.marginBox]}
    //             onChangeText={text => this.onChangeFirstName(text)}
    //             value={this.state.firstName}
    //             defaultValue={""}
    //         />
    //         <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Last Name</Text>
    //         <TextInput
    //             style={[styles.textInput, styles.marginBox]}
    //             onChangeText={text => this.onChangeLastName(text)}
    //             value={this.state.lastName}
    //             defaultValue={""}
    //         />
    //         <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Email</Text>
    //         <TextInput
    //             style={[styles.textInput, styles.marginBox]}
    //             onChangeText={text => this.onChangeEmail(text)}
    //             value={this.state.email}
    //             defaultValue={""}
    //         />
    //         <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Password</Text>
    //         <TextInput
    //             style={[styles.textInput, styles.marginBox]}
    //             onChangeText={text => this.onChangePassword(text)}
    //             value={this.state.password}
    //             defaultValue={""}
    //         />
    //         <Text style={[styles.text, styles.marginBox, material.display1, styles.red]}>{this.state.errorMessage}</Text>
    //         <TouchableHighlight onPress={this.register} style={[styles.button, styles.marginBox]}>
    //             <Text color="green"> Register </Text>
    //         </TouchableHighlight>
    //     </SafeAreaView>
    // );

// export default class Home extends React.Component {
//     state = {
//         dateTime: 0,
//     };





//     render() {
//         return (

//         );
//     }
// }
