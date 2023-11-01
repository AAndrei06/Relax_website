firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log("logat");
    } else {
        console.log("Nelogat");
    }
});

let GoogleBtn = document.getElementById("google-login-btn");
let FacebookBtn = document.getElementById("facebook-login-btn");
let TwitterBtn = document.getElementById("twitter-login-btn");
let EmailInput = document.querySelector(".email-login-page-input");
let PasswordInput = document.querySelector(".password-login-page-input");
let SubmitForm = document.querySelector(".submit-btn-form-pass");


SubmitForm.addEventListener("click", () => {
    if (EmailInput.value != "" && PasswordInput.value != "") {
        firebase.auth().signInWithEmailAndPassword(EmailInput.value, PasswordInput.value)
            .then((userCredential) => {
                var user = userCredential.user;
                loadingAnim()

                setTimeout(() => {
                    responseAnim(false, "Succes")
                    setTimeout(() => {
                        endAnim();
                        window.location.href = '/';
                    }, 2000)
                }, 1000)
            })
            .catch((error) => {
                loadingAnim()
                setTimeout(() => {
                    responseAnim(true, "Credențiale Nevalide")

                    setTimeout(() => {
                        endAnim()
                    }, 2000)
                }, 1000)
                console.log(error);
            });
    }
});

// Google SignIn

GoogleBtn.addEventListener("click", () => {
    console.log("hello");
    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) => {

            var user = result.user;
            loadingAnim()

            setTimeout(() => {
                responseAnim(false, "Succes")
                setTimeout(() => {
                    endAnim();
                    window.location.href = '/';
                }, 2000)
            }, 1000)
        }).catch((error) => {
            loadingAnim()
            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
        });
});

// Facebook SignIn

FacebookBtn.addEventListener("click", () => {

    firebase
        .auth()
        .signInWithPopup(FacebookProvider)
        .then((result) => {

            var user = result.user;
            loadingAnim()

            setTimeout(() => {
                responseAnim(false, "Succes")
                setTimeout(() => {
                    endAnim();
                    window.location.href = '/';
                }, 2000)
            }, 1000)
        })
        .catch((error) => {
            loadingAnim()
            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
        });

});

// Twitter SignIn

TwitterBtn.addEventListener("click", () => {

    firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) => {

            var user = result.user;
            loadingAnim()

            setTimeout(() => {
                responseAnim(false, "Succes")
                setTimeout(() => {
                    endAnim();
                    window.location.href = '/';
                }, 2000)
            }, 1000)
        })
        .catch((error) => {
            loadingAnim()
            setTimeout(() => {
                responseAnim(true, "Eroare")

                setTimeout(() => {
                    endAnim()
                }, 2000)
            }, 1000)
        });
});

