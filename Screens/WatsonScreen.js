import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, Dimensions, SafeAreaView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';
import loginstyles from '../assets/styles/loginStyles';
// const convLib = require('../util/Conversation.js');

import { GiftedChat } from 'react-native-gifted-chat'

// import AssistantV2 from 'ibm-watson/assistant/v2';
// import { IamAuthenticator } from 'ibm-watson/auth';

// const apikey = '34sVqK52f90A5weKgqDrZWnpt2hKMkClmQ1ckF-8VYFa'
// const watsonURL = 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/88dbf759-fa1a-4bf8-8f7c-cd84f4991bde'
// const assistantId = '2f825093-f3f1-4678-9a71-251708980db2'

// const assistant = new AssistantV2({
//     version: '2020-04-01',
//     authenticator: new IamAuthenticator({
//         apikey: apikey,
//     }),
//     url: watsonURL,
// });

// async function sendMessage(message) {
//     let sessionId;
//     try {
//         const session = await assistant.createSession({
//             assistantId: assistantId
//         })
//         sessionId = session.result.session_id
//     } catch (err) {
//         console.log(err);
//     }
    
//     const chatResult = await assistant.message({
//         assistantId: assistantId,
//         sessionId: sessionId,
//         input: {
//             'message_type': 'text',
//             'text': message
//         }
//     })

//     return chatResult.result.output.generic[0].text
// }

export default function WatsonScreen() {
    const [messages, setMessages] = useState([]);
  
    // populate the chat with something on load
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello there friend! I\'m Watson, your personal assistant',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'IBM Watson',
            avatar: 'https://www.ibm.com/cloud/watson-assistant/assets/img/avatar_blue.png',
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
       const userText = messages[0].text
       setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //    convLib.sendMessage(userText).then((message) => {
    //        console.log(message);
    //         messages.append({
    //             text: message,
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'IBM Watson',
    //                 avatar: 'https://www.ibm.com/cloud/watson-assistant/assets/img/avatar_blue.png',
    //             },
    //         })
    //         setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //    })
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
