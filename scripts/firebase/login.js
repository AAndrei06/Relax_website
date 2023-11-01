const form = document.querySelector("#form")

const sendBttnFeedback = document.querySelector('#submit-bttn>.feedback');
const sendBttnLoading = document.querySelector('#submit-bttn>.loading');
const sendBttnText = document.querySelector('#submit-bttn>.text');

function loadingAnim()
{
    sendBttnText.innerText = ''
    sendBttnLoading.style.opacity = "1"
}

function responseAnim(err = false,msg)
{
    if (err)
    {
        sendBttnFeedback.style.background = '#EF5B5B'
        sendBttnFeedback.textContent = msg
    }else{
        sendBttnFeedback.style.background = '#799f82'
        sendBttnFeedback.textContent = msg
    }
    sendBttnLoading.style.opacity = "0"

    setTimeout(() =>
    {
        sendBttnText.innerText = 'Trimite'
    }, 250)

    sendBttnFeedback.style.transform = "translateX(0%)"
    sendBttnFeedback.style.opacity = "1"

    
}

function endAnim()
{

    sendBttnFeedback.style.transform = "translateX(100%)"
    setTimeout(() =>
    {
        sendBttnFeedback.style.opacity = "0"
        sendBttnFeedback.style.transform = "translateX(-100%)"
    }, 250);

}

form.addEventListener('submit', (e) =>
{
    e.preventDefault();
})


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

