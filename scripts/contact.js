// Copy Function

const infoDivs = document.querySelectorAll('.form-section>.content>.form-content>.column1>.info>div');

let copyTimeout;

infoDivs.forEach(div =>
{
    div.addEventListener('click', (e) =>
    {
        console.log(e.target)
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

const sendBttn = document.querySelector("#send-bttn")
const sendBttnFeedback = document.querySelector('#send-bttn>.feedback');
const sendBttnLoading = document.querySelector('#send-bttn>.loading');
const sendBttnText = document.querySelector('#send-bttn>.text');



function deleteTextAnim(input)
{
    let time = 5;

    if (input.value.length < 50)
    {
        time = 10;
    }

    let interval = setInterval(() =>
    {
        if (input.value.length > 0)
        {
            input.value = input.value.slice(0, -1);
        }
        else
        {
            clearInterval(interval);
        }
    }, time);
}

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

    sendBttnText.innerText = ''
    sendBttnLoading.style.opacity = "1"

    deleteTextAnim(nameInput)
    deleteTextAnim(emailInput)
    deleteTextAnim(messageInput)

    emailjs.send(serviceId, templateId, params).then(res =>
    {
        sendBttnLoading.style.opacity = "0"
        setTimeout(() =>
        {
            sendBttnText.innerText = 'Trimite'
        }, 250)


        if (res.status == 200)
        {
            sendBttnFeedback.style.transform = "translateX(0%)"
            sendBttnFeedback.style.opacity = "1"
            setTimeout(() =>
            {
                sendBttnFeedback.style.transform = "translateX(100%)"
                setTimeout(() =>
                {
                    sendBttnFeedback.style.opacity = "0"
                    sendBttnFeedback.style.transform = "translateX(-100%)"
                }, 250);
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
