const form = document.querySelector("#form")

const sendBttnFeedback = document.querySelector('#submit-bttn>.feedback');
const sendBttnLoading = document.querySelector('#submit-bttn>.loading');
const sendBttnText = document.querySelector('#submit-bttn>.text');

function loadingAnim()
{
    sendBttnText.innerText = ''
    sendBttnLoading.style.opacity = "1"
}

function responseAnim(err = false, msg)
{
    if (err)
    {
        sendBttnFeedback.style.background = '#EF5B5B'
        sendBttnFeedback.textContent = msg
    } else
    {
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
    if (EmailInput.value != "" && PasswordInput.value != "")
    {
        loadingAnim()
        firebase.auth().signInWithEmailAndPassword(EmailInput.value, PasswordInput.value)
            .then((userCredential) =>
            {
                responseAnim(false, "Succes")
                setTimeout(() =>
                {
                    endAnim();
                    window.location.href = '/';
                }, 2000)

            })
            .catch((error) =>
            {
                responseAnim(true, "Credențiale Nevalide")

                setTimeout(() =>
                {
                    endAnim()
                }, 2000)

            });
    }
})

let GoogleBtn = document.getElementById("google-login-btn");
let TwitterBtn = document.getElementById("twitter-login-btn");
let EmailInput = document.querySelector(".email-login-page-input");
let PasswordInput = document.querySelector(".password-login-page-input");
let SubmitForm = document.querySelector(".submit-btn-form-pass");


// Google SignIn

GoogleBtn.addEventListener("click", () =>
{
    loadingAnim()
    firebase.auth()
        .signInWithPopup(GoogleProvider)
        .then((result) =>
        {

            let user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
            {
                querySnapshot.forEach((obj) =>
                {
                    is_user = true;
                })
            }).then(() =>
            {
                if (!is_user)
                {
                    let date = new Date();
                    usersDB.add({
                        name: user.displayName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() =>
                    {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],

                        }).then(() =>
                        {

                            responseAnim(false, "Succes")
                            setTimeout(() =>
                            {
                                endAnim()
                                window.location.href = '/';
                            }, 2000)

                        })
                    });
                }
            });
        }).catch((error) =>
        {

            responseAnim(true, "Eroare")

            setTimeout(() =>
            {
                endAnim()
            }, 2000)

        });
});


// Twitter SignIn

TwitterBtn.addEventListener("click", () =>
{
    loadingAnim();
    firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) =>
        {

            var user = result.user;
            let is_user = false;
            usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
            {
                querySnapshot.forEach((obj) =>
                {
                    is_user = true;
                })
            }).then(() =>
            {
                if (!is_user)
                {
                    let date = new Date();
                    usersDB.add({
                        name: user.displayName,
                        ID: user.uid,
                        admin: false,
                        created: date.getTime(),
                        photoURL: startImage,
                    }).then(() =>
                    {
                        cartsDB.add({
                            ID: user.uid,
                            products: [],

                        }).then(() =>
                        {
                            responseAnim(false, "Succes")
                            setTimeout(() =>
                            {
                                endAnim()
                                window.location.href = '/';
                            }, 2000)

                        })
                    });
                }
            });
        })
        .catch((error) =>
        {
            responseAnim(true, "Eroare")

            setTimeout(() =>
            {
                endAnim()
            }, 2000)

        });
});

