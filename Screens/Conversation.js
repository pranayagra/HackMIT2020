const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const apikey = '34sVqK52f90A5weKgqDrZWnpt2hKMkClmQ1ckF-8VYFa'
const watsonURL = 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/88dbf759-fa1a-4bf8-8f7c-cd84f4991bde'
const assistantId = '2f825093-f3f1-4678-9a71-251708980db2'

const assistant = new AssistantV2({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({
        apikey: apikey,
    }),
    url: watsonURL,
});

async function sendMessage(message) {
    let sessionId;
    try {
        const session = await assistant.createSession({
            assistantId: assistantId
        })
        sessionId = session.result.session_id
    } catch (err) {
        console.log(err);
    }
    
    const chatResult = await assistant.message({
        assistantId: assistantId,
        sessionId: sessionId,
        input: {
            'message_type': 'text',
            'text': message
        }
    })

    return chatResult.result.output.generic[0].text
}
sendMessage("Hi").then(data => console.log(data))
sendMessage("I'm sad").then(data => console.log(data))

module.export = {sendMessage}