import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "myapikey",
    authDomain: "myapp.firebaseapp.com",
    databaseURL: "https://myapp.firebaseio.com",
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export default database
