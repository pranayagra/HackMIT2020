import React, {useState} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, Dimensions, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import loginstyles from '../assets/styles/loginStyles';

export default function LandingPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Telehug</Text>
            <Image style={[styles.image, styles.marginBox]} source={require("../assets/images/icon.png")} />
            <View style={styles.actionContainer}>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Login')}>I want to video call someone</Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('WatsonScreen')}>I just want some hugs</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    title: {
        marginTop: 25,
        marginBottom: 25,
        fontSize: 50,
    },
    image: {
        width: 100,
        height: 100,
    },
    actionContainer: {
        marginTop: 50,
        marginBottom: 20,
    },
    button: {
        marginBottom: 30,
    }
});