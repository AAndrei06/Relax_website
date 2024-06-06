let submitBtn = document.querySelector(".submit-btn-form-register");
let passworField = document.querySelector(".pass-field-input");
let emailField = document.querySelector(".email-field-input-sign");
let GoogleBTN = document.getElementById("google-signin-provider");
let TwitterBTN = document.getElementById("twitter-login-btn");

// Google SignIn

const form = document.querySelector("#form")
const sendBttnFeedback = document.querySelector('#submit-bttn>.feedback');
const sendBttnLoading = document.querySelector('#submit-bttn>.loading');
const sendBttnText = document.querySelector('#submit-bttn>.text');

function loadingAnim() {
    sendBttnText.innerText = ''
    sendBttnLoading.style.opacity = "1"
}

function responseAnim(err = false, msg) {
    if (err) {
        sendBttnFeedback.style.background = '#EF5B5B'
        sendBttnFeedback.textContent = msg
    } else {
        sendBttnFeedback.style.background = '#799f82'
        sendBttnFeedback.textContent = msg
    }
    sendBttnLoading.style.opacity = "0"

    setTimeout(() => {
        sendBttnText.innerText = 'Trimite'
    }, 250)

    sendBttnFeedback.style.transform = "translateX(0%)"
    sendBttnFeedback.style.opacity = "1"


}

function endAnim() {

    sendBttnFeedback.style.transform = "translateX(100%)"
    setTimeout(() => {
        sendBttnFeedback.style.opacity = "0"
        sendBttnFeedback.style.transform = "translateX(-100%)"
    }, 250);

}
console.log(window.location)
form.addEventListener('submit', (e) => {

    e.preventDefault();
    email = emailField.value;
    if (email.value != "") {
        loadingAnim()

        var actionCodeSettings = {
            url: window.location.origin + '/pages/menu.html',
            handleCodeInApp: true,
        };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                responseAnim(false, "Succes")
                setTimeout(() => {
                    endAnim()
                }, 2000)
            })
            .catch((error) => {
                console.log(error)
            });
    }
})

GoogleBTN.addEventListener("click", () => {
    loadingAnim()

    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) => {
            var user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((obj) => {
                    is_user = true;
                })
            }).then(() => {
                console.log(user)
                if (!is_user) {

                    let date = new Date();
                    usersDB.add({
                        name: user.displayName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() => {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],
                        }).then(() => {


                            responseAnim(false, "Succes")
                            setTimeout(() => {
                                endAnim()
                                window.location.href = '/';

                            }, 2000)

                        });


                    });
                }
            });



        }).catch((error) => {

            responseAnim(true, "Eroare")

            setTimeout(() => {
                endAnim()
            }, 2000)

            console.log(error);
        });
});


// Twitter SignIn

TwitterBTN.addEventListener("click", () => {
    loadingAnim()
    firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) => {

            var user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((obj) => {
                    is_user = true;
                })
            }).then(() => {
                if (!is_user) {
                    let date = new Date();
                    usersDB.add({
                        name: user.displayName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() => {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],
                        }).then(() => {
                            responseAnim(false, "Succes")
                            setTimeout(() => {
                                endAnim()
                                window.location.href = '/';
                            }, 2000)

                        });


                    });
                }
            });

        })
        .catch((error) => {

            responseAnim(true, "Eroare")

            setTimeout(() => {
                endAnim()
            }, 2000)

        });
});
