import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, Dimensions, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import loginstyles from '../assets/styles/loginStyles';

import { GiftedChat } from 'react-native-gifted-chat'

export default function WatsonScreen() {
    const [messages, setMessages] = useState([]);
  
    // populate the chat with something on load
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: '../assets/images/ibmwatson_pfp.png',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
        console.log(messages)  // array consisting of one element, which contains the most recent message
        /* format:
        [{
            _id: number,
            createdAt: Date,
            text: string,
            user: {
              _id: number
              name: string,
              avatar: string,
            },
          },
        }]
        */
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
