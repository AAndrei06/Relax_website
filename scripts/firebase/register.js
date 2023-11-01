let submitBtn = document.querySelector(".submit-btn-form-register");
let passworField = document.querySelector(".pass-field-input");
let emailField = document.querySelector(".email-field-input-sign");
let GoogleBTN = document.getElementById("google-signin-provider");
let FacebookBTN = document.getElementById("facebook-signin-provider");
let TwitterBTN = document.getElementById("twitter-sigin-provider");

// Google SignIn

GoogleBTN.addEventListener("click", () => {
    console.log("hello");
    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) => {
            var user = result.user;
            usersDB.add({
                name: "NewUser",
                ID: user.uid,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/default.jpg?alt=media&token=be2d14b5-aa80-417e-b1e3-4fb2a254357d&_gl=1*1uz8z3e*_ga*MTEyMjUzMjA4MS4xNjg4NzIxNjUw*_ga_CW55HF8NVT*MTY5ODc1NTkyMy41MS4xLjE2OTg3NTY3OTAuNDMuMC4w",
            }).then(() => {

                loadingAnim()

                setTimeout(() => {
                    responseAnim(false, "Succes")
                    setTimeout(() => {
                        endAnim()
                        window.location.href = '/';
                    }, 2000)
                }, 1000)

            });

        }).catch((error) => {
            loadingAnim()

            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
            console.log(error);
        });
});

// Facebook SignIn

FacebookBTN.addEventListener("click", () => {

    firebase
        .auth()
        .signInWithPopup(FacebookProvider)
        .then((result) => {

            var user = result.user;
            usersDB.add({
                name: "NewUser",
                ID: user.uid,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/default.jpg?alt=media&token=be2d14b5-aa80-417e-b1e3-4fb2a254357d&_gl=1*1uz8z3e*_ga*MTEyMjUzMjA4MS4xNjg4NzIxNjUw*_ga_CW55HF8NVT*MTY5ODc1NTkyMy41MS4xLjE2OTg3NTY3OTAuNDMuMC4w",
            }).then(() => {

                loadingAnim()

                setTimeout(() => {
                    responseAnim(false, "Succes")
                    setTimeout(() => {
                        endAnim();
                        window.location.href = '/';
                    }, 2000)
                }, 1000)

            });

        })
        .catch((error) => {
            loadingAnim()

            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
            console.log(error);
        });

});

// Twitter SignIn

TwitterBTN.addEventListener("click", () => {

    firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) => {

            var user = result.user;
            usersDB.add({
                name: "NewUser",
                ID: user.uid,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/default.jpg?alt=media&token=be2d14b5-aa80-417e-b1e3-4fb2a254357d&_gl=1*1uz8z3e*_ga*MTEyMjUzMjA4MS4xNjg4NzIxNjUw*_ga_CW55HF8NVT*MTY5ODc1NTkyMy41MS4xLjE2OTg3NTY3OTAuNDMuMC4w",
            }).then(() => {

                loadingAnim()

                setTimeout(() => {
                    responseAnim(false, "Succes")
                    setTimeout(() => {
                        endAnim()
                        window.location.href = '/';
                    }, 2000)
                }, 1000)

            });

        })
        .catch((error) => {
            loadingAnim()

            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
            console.log(error);
        });
});

submitBtn.onclick = () => {
    email = emailField.value;
    password = passworField.value;
    if (email.value != "" && password.value != "") {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                usersDB.add({
                    name: "NewUser",
                    PASS: password,
                    EMAIL: email,
                    ID: user.uid,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/default.jpg?alt=media&token=be2d14b5-aa80-417e-b1e3-4fb2a254357d&_gl=1*1uz8z3e*_ga*MTEyMjUzMjA4MS4xNjg4NzIxNjUw*_ga_CW55HF8NVT*MTY5ODc1NTkyMy41MS4xLjE2OTg3NTY3OTAuNDMuMC4w",
                }).then(() => {

                    loadingAnim()

                    setTimeout(() => {
                        responseAnim(false, "Succes")
                        setTimeout(() => {
                            endAnim()
                            window.location.href = '/';
                        }, 2000)
                    }, 1000)

                });
            })
            .catch((error) => {
                loadingAnim()
                let message = "";
                if (error.code == "auth/invalid-email") {
                    message = "Email Nevalid";
                } else if (error.code == "auth/weak-password") {
                    message = "Parolă Prea Slabă";
                } else if (error.code == "auth/email-already-in-use") {
                    message = "Email Folosit";
                } else {
                    message = "Eroare";
                }

                setTimeout(() => {
                    responseAnim(true, message)

                    setTimeout(() => {
                        endAnim()
                    }, 2000)
                }, 1000)
            });
    }
}