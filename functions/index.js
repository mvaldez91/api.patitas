const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('./firebase-config.json');

firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: 'https://patitas-44646.firebaseio.com'
});

exports.api = functions.https.onRequest((req, res)=>{
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //Reference to database node

    const data = firebase.database().ref('/pets');
    if (req.method ==='GET'){
        data.on('value', (snapshot)=>{
          //  console.log(snapshot.val());
            const parseData = Object.keys(snapshot.val() || {}).map(key=>{
                return snapshot.val()[key];
            });
            res.json(parseData);
        });
    }
});