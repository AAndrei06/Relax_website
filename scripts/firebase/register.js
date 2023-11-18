// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user);
//         usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 console.log(doc.data().photoURL);
//                 //Ce am facut?
//                 /*
//                 In baza de date am salvat o copie al fiecarui user,un fel de profil,si acolo am salvat si
//                 poza de profil,acum am extras acest element din baza de date si am afisat linkul pozei din storage
//                 tu iei linkul acesta si il pui in src la img,asta e tot,am afisat si obiectul json la user,dar nu iti va trebui precis.
//                 */
//             });
//         })
//     } else {
//         console.log("user nu este logat");
//     }
// });


let submitBtn = document.querySelector(".submit-btn-form-register");
let passworField = document.querySelector(".pass-field-input");
let emailField = document.querySelector(".email-field-input-sign");
let GoogleBTN = document.getElementById("google-signin-provider");
let FacebookBTN = document.getElementById("facebook-signin-provider");
let TwitterBTN = document.getElementById("twitter-sigin-provider");

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

form.addEventListener('submit', (e) => {
    e.preventDefault();
})





GoogleBTN.addEventListener("click", () => {
    console.log("hello");
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
                if (!is_user) {
                    let date = new Date();
                    usersDB.add({
                        name: userInitialName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() => {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],
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


                    });
                }
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
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((obj) => {
                    is_user = true;
                })
            }).then(() => {
                if (!is_user) {
                    let date = new Date();
                    usersDB.add({
                        name: userInitialName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() => {
                        cartsDB.add({
                            ID: user.uid,
                            products: [], 
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


                    });
                }
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
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((obj) => {
                    is_user = true;
                })
            }).then(() => {
                if (!is_user) {
                    let date = new Date();
                    usersDB.add({
                        name: userInitialName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() => {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],      
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


                    });
                }
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
                let date = new Date();
                cartsDB.add({
                    ID: user.uid,
                    products: [],
                }).then(() => {
                    usersDB.add({
                        name: userInitialName,
                        PASS: password,
                        EMAIL: email,
                        admin: false,
                        ID: user.uid,
                        created: date.getTime(),
                        photoURL: startImage,
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