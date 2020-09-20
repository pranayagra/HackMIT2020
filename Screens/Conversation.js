var prompt = require('prompt-sync')();
var watson = require('watson-developer-cloud');

var workspace = '78d8bc86-e4b8-43a6-a0b7-ffb6ee9d46fe';

var conversation = watson.conversation({
    username: 'tasha_kim@brown.edu',
    password: 'temporaryPassword1',
    version: 'v1',
    version_date: '2017-05-26'
});

conversation.message({
    workspace_id: workspace,
    input: {'text': ''},
}, processUserInput);

function processUserInput(err, response) {
    if(err) {
        console.log(err);
        return;
    }
    if(response.intents.length > 0) {
        console.log('Intent: ');
        console.log(response.intents[0]);
    }
    if(response.output.text > 0) {
        console.log(response.output.text[0]);
    }

    var newMessage = prompt('enter response: ');
    if(newMessage === 'stop') {
        return;
    }
    conversation.message({
        workspace_id: workspace,
        input: {text: newMessage},
        context: response.context, 

    }, processUserInput);
}

