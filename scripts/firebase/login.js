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


SubmitForm.addEventListener("click",() => {
    if (EmailInput.value != "" && PasswordInput.value != ""){
        firebase.auth().signInWithEmailAndPassword(EmailInput.value, PasswordInput.value)
        .then((userCredential) => {
            var user = userCredential.user;
        })
        .catch((error) => {
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

        }).catch((error) => {
            console.log(error);
        });
});

// Facebook SignIn

FacebookBtn.addEventListener("click", () => {

        firebase
        .auth()
        .signInWithPopup(FacebookProvider)
        .then((result) => {

            var user = result.user;

        })
        .catch((error) => {
            console.log(error);
        });

});

// Twitter SignIn

TwitterBtn.addEventListener("click", () => {

        firebase
        .auth()
        .signInWithPopup(TwitterProvider)
        .then((result) => {

            var user = result.user;

        })
        .catch((error) => {
            console.log(error);
        });
});

