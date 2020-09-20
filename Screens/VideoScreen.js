import React, { Component } from 'react';
import {View, StyleSheet, Vibration} from 'react-native';
import {Button} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import {firebase} from '../firebase';

const db = firebase.firestore();

export default class VideoScreen extends Component {
    constructor(props) {
        super(props);
        const {route} = props
        const {channel} = route.params;
        this.state = {
            channel: channel
        }
    }

    componentDidMount() {

    };
    
    sendAHug() {
        var dateTime = 0;
    
        console.log("Function called!");
        dateTime = Date.now();
        // Vibrate for 20s.

        // db.collection("messages").doc("hugs").update({
        //     time: dateTime,
        // })
        //     .then(function () {
    
        //         console.log("Document successfully written!");
        //     })
        //     .catch(function (error) {
        //         console.error("Error writing document: ", error);
        //     });

        for (let i = 0; i < 5; i++) {
            Vibration.vibrate(1500);
            // Vibration.cancel();
            Vibration.vibrate(600);
            // Vibration.cancel();
        }
    
        // db.collection("messages").doc("hugs")
        //     .onSnapshot({
        //         // Listen for document metadata changes
        //         // includeMetadataChanges: true
        //     }, function (doc) {
        //         for (let i = 0; i < 5; i++) {
        //             Vibration.vibrate(1500);
        //         }
        //         // console.log(dateTime);
        //         // console.log(doc.data().time);
        //         // if (doc.data().time - dateTime != 0) {
        //         //     for (let i = 0; i < 5; i++) {
        //         //         Vibration.vibrate(1500);
        //         //     }
        //         //     // .vibrate([20000]);
        //         //     console.log("Vibrate");
        //         //     console.log(dateTime);
        //         // } else {
        //         //     console.log("Signaled by me");
        //         // }
        //     });
    }

    render() {
        return (
                <View style={styles.container}>
                    <WebView source= {{ uri: 'https://hackmit2020telehuggies.web.app/' }}/>
                    <Button onPress={() => this.sendAHug()} style={styles.button}>Send a Hug!</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center"
    },
})