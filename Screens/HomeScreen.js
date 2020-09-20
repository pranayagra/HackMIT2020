import React from 'react';
import { StyleSheet, Text, Dimensions, View, Button, Image, SafeAreaView, FlatList } from 'react-native';
import { material } from 'react-native-typography';
import firestore from '../firebase';
import firebase from 'firebase';
import loginstyles from '../assets/styles/loginStyles';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={material.body2}>{navigation.getParam('name', 'admin')}'s Account</Text>
                    <Text style={[material.caption, { fontSize: 10 }]}>Home</Text>
                </View>
            )
        };
    };

    state = {
        stuff: [],
    }

    goToRoom = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Rooms', {
            name: navigation.state.params.name,
        });
    }

    watsonChat = () => {
        const { navigation } = this.props;
        this.props.navigation.navigate('Chat', {
            name: navigation.state.params.name,
        });
    }

    logout = () => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
        this.props.navigation.navigate('Login', {
        });
    }

    updateStuff = docData => {
        var tempStuff = this.state.stuff;
        tempStuff.push(docData);
        this.setState({ stuff: tempStuff });
        console.log(this.state.stuff);
    }

    updateFunction = () => {
        const { navigation } = this.props;
        // const collRef = firestore.collection(navigation.state.params.name);
        // let query = collRef.get()
        //     .then(snapshot => {
        //         snapshot.forEach(doc => {
        //             console.log(doc.id, '=>', doc.data());
        //             this.updateStuff(doc.data());
        //         });
        //     })
        //     .catch(err => {
        //         console.log('Error getting documents', err);
        //     });

    }
    componentDidMount() {
        this.updateFunction();
    }

    render() {
        const { navigation } = this.props;
        console.log(navigation);
        return (
            <SafeAreaView style={styles.container}>
                <Image style={[styles.image, styles.marginBox]} source={require("../TeleHuggies.png")}/>
                <Button onPress={this.goToRoom} title="Join a room" />
                <Button onPress={this.watsonChat} title="Talk to Dr. Watson" />
                <Button onPress={this.logout} title="Log out" />
                <View style={styles.hugeMarginBox} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create(loginstyles);
