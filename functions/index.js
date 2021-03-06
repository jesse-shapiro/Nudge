const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.sendPushNotifications = functions.firestore.document('nudges/{nudgeId}').onCreate(event => {
  // const root = event.data.ref.root
  var messages = []

  expoToken = 'ExponentPushToken[QV9L4FGgDP_HncXPbp9G7l]'
  messages.push({
    'to': expoToken,
    'body': 'New Nudge added'
  })

  return fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'host': exp.host,
          // 'accept': application/json,
          // 'accept-encoding': gzip, deflate,
          // 'content-type': application/json
        },
        body: JSON.stringify(messages)
        // body: {
        //   'to': expoToken,
        //   'body': 'New Nudge added'
        // }
        // JSON.stringify(messages)
      })
    })


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
