import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from '../config';


class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      return user;
    });
  }
  static getFirebaseAuth(){
    return firebase.auth();
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByPathOnce(path) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .once('value');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }
}

export default FirebaseApi;
