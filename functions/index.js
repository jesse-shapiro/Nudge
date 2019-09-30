const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.sendPush = functions.database.ref('/nudges/{id}').onCreate(event => {
//   let projectStateChanged = false;
//   let projectCreated = false;
//   let projectData = event.data.val();
//   if (!event.data.previous.exists()) {
//       projectCreated = true;
//   }
//   if (!projectCreated && event.data.changed()) {
//       projectStateChanged = true;
//   }

//   let msg = 'A project state was changed';

//   if (projectCreated) {
//     msg = `The following new project was added to the project: ${projectData.title}`;
//   }


//   let payload = {
//     notification: {
//         title: 'Firebase Notification',
//         body: msg,
//         sound: 'default',
//         badge: '1'
//     }
//   };


//   return loadUsers().then(users => {
//       let tokens = [];
//       for (let user of users) {
//           tokens.push(user.pushToken);
//       }



//       return admin.messaging().sendToDevice(tokens, payload);
//   });
// });

// function loadUsers() {
//   let dbRef = admin.database().ref('/users');
//   let defer = new Promise((resolve, reject) => {
//       dbRef.once('value', (snap) => {
//           let data = snap.val();
//           let users = [];
//           for (var property in data) {
//               users.push(data[property]);
//           }
//           resolve(users);
//       }, (err) => {
//           reject(err);
//       });
//   });
//   return defer;
// }

exports.sendPushNotifications = functions.firestore.document('nudges/{nudgeId}').onCreate(event => {
  // const root = event.data.ref.root
  var messages = []
  console.log('testing@@@@@@@@@@@@@@@@@@@@@@@@@@')

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
    // return the main promise
    // return root.child('/users').once('value').then(function (snapshot) {
    //   console.log('snap-----', snapshot)
    //   snapshot.forEach(function (childSnapshot) {
    //     var expoToken = childSnapshot.val().expoToken

    //     if (expoToken) {
    //       messages.push({
    //         'to': expoToken,
    //         'body': 'New Nudge added'
    //       })
    //     }
    //   })

    //   return Promise.all(messages)

    // }).then(messages => {
    //   return fetch('https://exp/.host/--/api/v2/push/send', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //       // 'host': exp.host,
    //       // 'accept': application/json,
    //       // 'accept-encoding': gzip, deflate,
    //       // 'content-type': application/json
    //     },
    //     body: JSON.stringify(messages)

    //   })
    // })






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
