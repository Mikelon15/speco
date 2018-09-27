import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './config';


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

  static createUserWithEmailAndPassword(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        user => resolve(user),
        error => reject(error)
      );
    })
  }
  static getFirebase() {
    return firebase;
  }

  static authSignOut() {
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

  static getUserID() {
    return firebase.auth().currentUser.uid;
  }

  static createNewKeyInPath(path) {
    return firebase
      .database()
      .ref(path)
      .push()
      .key
  }

  static getValueByPathOnce(path) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .once('value');
  }

  static getChildAddedByKeyOnce(path, key) {
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
  static updateDatabaseByPath(path, update) {
    return firebase
      .database()
      .ref(path)
      .update(update)
  }
  static removeDatabaseByPath(path) {
    return firebase
      .database()
      .ref(path)
      .remove()
  }
}

export default FirebaseApi;
