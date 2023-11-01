import { deleteTextAnim } from "./utils.js";

// Show / Hide password text

const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const togglePasswordButton = document.querySelector('.see-password');

togglePasswordButton.addEventListener('click', function ()
{
    if (passwordField.type === 'password')
    {
        passwordField.type = 'text';
        togglePasswordButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 4.1665C4.6968 4.1665 1.6665 9.99984 1.6665 9.99984C1.6665 9.99984 4.6968 15.8332 9.99984 15.8332C15.3028 15.8332 18.3332 9.99984 18.3332 9.99984C18.3332 9.99984 15.3028 4.1665 9.99984 4.1665Z" stroke="#0C0C0C" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5Z" stroke="#0C0C0C" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>'
    } else
    {
        passwordField.type = 'password';
        togglePasswordButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.49902 2.5L17.499 17.5M8.20259 8.26137C7.76705 8.71133 7.49902 9.32433 7.49902 10C7.49902 11.3807 8.61834 12.5 9.999 12.5C10.6844 12.5 11.3054 12.2242 11.757 11.7775M5.41569 5.53929C3.83294 6.58362 2.62738 8.15328 2.04736 10C3.10924 13.3809 6.26783 15.8333 9.99917 15.8333C11.6566 15.8333 13.201 15.3495 14.4988 14.5153M9.16567 4.20782C9.43984 4.18061 9.71792 4.16667 9.99917 4.16667C13.7306 4.16667 16.8892 6.61909 17.951 10C17.7171 10.745 17.3813 11.4448 16.96 12.0833" stroke="#0C0C0C" stroke-opacity="0.5" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" /></svg >'

    }
});

// Button Animation
/*
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
*/