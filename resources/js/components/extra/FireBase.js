
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDYfNh7s4SFh2VDJJ9HplC2y7ehO1NhvfE",
    authDomain: "larafire-240b4.firebaseapp.com",
    databaseURL: "https://larafire-240b4.firebaseio.com",
    projectId: "larafire-240b4",
    storageBucket: "larafire-240b4.appspot.com",
    messagingSenderId: "557048720428",
    appId: "1:557048720428:web:690fee0ef9ff5181acf589",
    measurementId: "G-JEJ1MZ09QJ"
};

const fire = firebase.initializeApp(config);

export default fire;


/*

function PushRegister(props) {


  console.log('Push')

  const config = {
    apiKey: "AIzaSyDYfNh7s4SFh2VDJJ9HplC2y7ehO1NhvfE",
    authDomain: "larafire-240b4.firebaseapp.com",
    databaseURL: "https://larafire-240b4.firebaseio.com",
    projectId: "larafire-240b4",
    storageBucket: "larafire-240b4.appspot.com",
    messagingSenderId: "557048720428",
    appId: "1:557048720428:web:690fee0ef9ff5181acf589",
    measurementId: "G-JEJ1MZ09QJ"
  };
  firebase.initializeApp(config);
  
  const messaging = firebase.messaging();
 
  messaging
    .requestPermission()
    .then(function () {
        return messaging.getToken()
    })
    .then(function (token) {
        console.log(token)
  
        const params = {
        fcm_token: token
        }
  
        axios
            .post('/save-device-token', params,{
                headers: {
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
            .then(response => {
                console.log(response.data)
  
            })
            .catch(err => {
                console.log(err)
            })
  
            axios
            .post('/send-push', params,{
                headers: {
                    Authorization: `Bearer ${localStorage.usertoken}`
                }
            })
            .then(response => {
                console.log(response.data)
  
            })
            .catch(err => {
                console.log(err)
            })
  
    })
    .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
    })
  
    

  messaging.onMessage(function (payload) {
    const noteTitle = payload.notification.title;
    const noteOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    }
    new Notification(noteTitle, noteOptions);
  })
  
return messaging
}

export default PushRegister;

*/