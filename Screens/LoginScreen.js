import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, Dimensions, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper'
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth';
import { AuthSession } from 'expo';

const config = {
    expoClientId: "12933073699-o1j09vvls4bktdlhkbmdcsqcm372eb1j.apps.googleusercontent.com",
    iosClientId: "12933073699-g35f5a7ar26g38smmns29ckujq60fcln.apps.googleusercontent.com",
    androidClientId: "12933073699-udssjufef5a3cfhj2hp3bftjm57j9arn.apps.googleusercontent.com",
};

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
    };
      

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        Alert.alert('HI');
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (/*!isUserEqual(googleUser, firebaseUser)*/true) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(result) {
                console.log('user signed in');
                Alert.alert('NEXT TRY' + result.user.uid);
                var userRef = firebase.database().ref('users/' + result.user.uid);
                userRef.child('gmail').set(result.user.email);
                userRef.child('profile_picture').set(result.additionalUserInfo.profile.picture);
                userRef.child('locale').set(result.additionalUserInfo.profile.locale);
                userRef.child('first_name').set(result.additionalUserInfo.profile.given_name);
                userRef.child('last_name').set(result.additionalUserInfo.profile.family_name);
                userRef.child('channel').set('')
                .then(function(snapshot) {
                    //console.log('Snapshot', snapshot)
                })
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this)
        );
      };

    signInWithGoogleAsync = async() => {
        const result = await Google.logInAsync(config);

        if (result.type === 'success') {
            this.onSignIn(result)
            return result.accessToken;
        } else {
            return {cancelled: true};
        }
        // if (type === 'success') {
        //     // Then you can use the Google REST API
        //     let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        //         headers: { Authorization: `Bearer ${accessToken}` },
        //     });
        // }
        // console.log(type);
        // console.log(accessToken);
        // console.log(user);
        // let redirectUrl = AuthSession.getRedirectUrl();
        // console.log(redirectUrl);
        // let googleWebAppId = "546887755757-tvh7ggaisbqp5mug7u599j4fcdhjvrqs.apps.googleusercontent.com";
        // let result = await AuthSession.startAsync({
        //     authUrl:
        //         `https://accounts.google.com/o/oauth2/v2/auth?` +
        //         `&client_id=${googleWebAppId}` +
        //         `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        //         `&response_type=code` +
        //         `&access_type=offline` +
        //         `&scope=profile`,
        // });
        // console.log(user.givenName);
        // console.log(result);
        // this.props.navigation.navigate('Home', {
        //     name: user.givenName,
        //     user: user,
        //     result: result,
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.signInWithGoogleAsync()}>Sign In With Google</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center"
    }
})

export default LoginScreen