import React from 'react';
import {View, Text} from 'react-native';

componentDidMount = () => {

};

sendAHug = () => {
    this.document()
    var dateTime = 0;

    console.log("Function called!");
    dateTime = Date.now();
    // Vibrate for 20s.
    db.collection("messages").doc("hugs").update({
        time: dateTime,
    })
        .then(function () {

            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

    db.collection("messages").doc("hugs")
        .onSnapshot({
            // Listen for document metadata changes
            // includeMetadataChanges: true
        }, function (doc) {
            console.log(dateTime);
            console.log(doc.data().time);
            if (doc.data().time - dateTime != 0) {
                navigator.vibrate([20000]);
                console.log("Vibrate");
                console.log(dateTime);
            } else {
                console.log("Signaled by me");
            }
        });
}

export default function VideoScreen() {
    return (
        <View>
             <View style={styles.container}>
                 <WebView source={{ uri: 'https://expo.io/' }} style={{ marginTop: 50 }} />
                 <Button title="Send a Hug!" onPress={sendAHug} />
            </View>
        </View>
    )
}