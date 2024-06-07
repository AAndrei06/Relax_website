import { lockScroll, unlockScroll } from "./utils.js";


if (firebase.auth().isSignInWithEmailLink(window.location.href)) {

    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
        window.location.href = '/';
    } else {

        firebase.auth().signInWithEmailLink(email, window.location.href)
            .then((result) => {
                window.localStorage.removeItem('emailForSignIn');
                var user = result.user;
                let is_user = false;
                usersDB.where("email", "==", user.email).get().then((querySnapshot) => {
                    querySnapshot.forEach((obj) => {
                        is_user = true;
                    })
                }).then(() => {
                    console.log(user)
                    if (!is_user) {

                        let date = new Date();
                        usersDB.add({
                            name: user.email.split("@")[0],
                            ID: user.uid,
                            admin: false,
                            created: date.getTime(),
                            photoURL: startImage,
                            email: user.email
                        }).then(() => {
                            cartsDB.add({
                                ID: user.uid,
                                products: [],
                            })
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }
}