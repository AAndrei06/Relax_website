
const firebaseConfig = {
apiKey: "AIzaSyAIit1b_9_JxLmLTJvehaj0_X6Zf1A3RYI",
authDomain: "relax-92c1e.firebaseapp.com",
projectId: "relax-92c1e",
storageBucket: "relax-92c1e.appspot.com",
messagingSenderId: "486583906577",
appId: "1:486583906577:web:993f9712bc823a70199cb0",
measurementId: "G-XY6LKLXYRY"
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);

// Google Provider
let GoogleProvider = new firebase.auth.GoogleAuthProvider();

// Facebook Provider
let FacebookProvider = new firebase.auth.FacebookAuthProvider();

// Twitter Provider
let TwitterProvider = new firebase.auth.TwitterAuthProvider();