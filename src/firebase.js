
import firebase from 'firebase/app';
import database from 'firebase/database';
// should go in a secret file
var config = {
    apiKey: "AIzaSyDGqvUz6xt3ZkDhHFk85rMIu7bQI_JLW4A",
    authDomain: "journal-ed5a3.firebaseapp.com",
    databaseURL: "https://journal-ed5a3.firebaseio.com/",
		storageBucket: "journal-ed5a3.appspot.com",
  };
  firebase.initializeApp(config);
// var databse = firebase.databse

export default firebase;
