import { deleteTextAnim, loadingAnim, responseAnim, endAnim } from "./utils.js";

// Copy Function
document.getElementsByTagName("body")[0].style.display = "block";
const infoDivs = document.querySelectorAll('.form-section>.content>.form-content>.column1>.info>div');

let copyTimeout;

infoDivs.forEach(div =>
{
    div.addEventListener('click', (e) =>
    {
        e.target.style.pointerEvents = 'none'
        const span = e.target.children[1]
        const text = span.innerText;

        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');

        document.body.removeChild(tempInput);

        span.textContent = 'Text Copiat!';

        clearTimeout(copyTimeout)
        copyTimeout = setTimeout(() =>
        {
            span.textContent = text;
            e.target.style.pointerEvents = 'initial'
        }, 400)
    })
})

// Send Email

const emailField = document.querySelector('#email');
const nameField = document.querySelector('#name');
const messageField = document.querySelector('#message');

const form = document.querySelector("#form");

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const sendBttn = document.querySelector("#submit-bttn")
const sendBttnFeedback = document.querySelector('#submit-bttn>.feedback');
const sendBttnLoading = document.querySelector('#submit-bttn>.loading');
const sendBttnText = document.querySelector('#submit-bttn>.text');


form.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const params = {

        from_name: nameField.value,
        email_id: emailField.value,
        message: messageField.value,
    }

    const serviceId = "service_mcv5bfc";
    const templateId = "template_iviag0d";

    loadingAnim(sendBttn)

    deleteTextAnim(nameInput)
    deleteTextAnim(emailInput)
    deleteTextAnim(messageInput)

    emailjs.send(serviceId, templateId, params).then(res =>
    {

        responseAnim(res.status != 200, sendBttn, "Trimite")


        if (res.status == 200)
        {
            setTimeout(() =>
            {
                endAnim(sendBttn)
            }, 2000)
        }

    }).catch(error =>
    {
        console.error('Error:', error);
    });

})

const faqIcons = document.querySelectorAll(".faq-section>.content>.faqs>.faq>.icon")

const faqObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {

            faqIcons.forEach((icon) =>
            {

                icon.classList.add('anim')
            })


        }


    });
});

faqObserver.observe(faqIcons[0]);

const underlineAnim = document.querySelector("#underline-anim")

const formObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            underlineAnim.classList.add('anim')
        }


    });
});


formObserver.observe(underlineAnim);
