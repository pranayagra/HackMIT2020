import React from 'react';
import { StyleSheet, Text, Image, View, Button, Dimensions, TouchableHighlight, TextInput, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography';
import * as Google from 'expo-google-app-auth';
import { AuthSession } from 'expo';
import mainstyles from '../assets/styles/loginStyles';

import firestore from '../firebase';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window')

const config = {
    expoClientId: "546887755757-tvh7ggaisbqp5mug7u599j4fcdhjvrqs.apps.googleusercontent.com",
    iosClientId: "546887755757-e8j57hodi5a90oks5r729c08vq9iivvo.apps.googleusercontent.com",
    androidClientId: "546887755757-gr0lf7r25ou08d08ovtqdm90kvpcktpo.apps.googleusercontent.com",
};

export default class LoginWGoogle extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={material.body2}>TeleHuggies</Text>
                    <Text style={[material.caption, { fontSize: 10 }]}>Guest</Text>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);
    }

    guest = async () => {

        const { type, accessToken, user } = await Google.logInAsync(config);

        if (type === 'success') {
            // Then you can use the Google REST API
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        }
        console.log(type);
        console.log(accessToken);
        console.log(user);
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl);
        let googleWebAppId = "546887755757-tvh7ggaisbqp5mug7u599j4fcdhjvrqs.apps.googleusercontent.com";
        let result = await AuthSession.startAsync({
            authUrl:
                `https://accounts.google.com/o/oauth2/v2/auth?` +
                `&client_id=${googleWebAppId}` +
                `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
                `&response_type=code` +
                `&access_type=offline` +
                `&scope=profile`,
        });
        console.log(user.givenName);
        console.log(result);
        this.props.navigation.navigate('Home', {
            name: user.givenName,
            // user: user,
            // result: result,
        });
     }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={[styles.image, styles.marginBox]} source={require("../TeleHuggies.png")} />
                <TouchableHighlight onPress={this.guest} style={[styles.button, styles.marginBox]}>
                    <Text color="green"> Login With Your Gmail Account! </Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create(mainstyles);
