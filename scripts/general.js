const navAcc = document.querySelector('nav>.account>.acc-img')
const navButtons = document.querySelectorAll('nav>.account>button')

firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        navButtons.forEach(button =>
        {
            button.style.display = "none"
        })

        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) =>
            {
                navAcc.querySelector('img').src = doc.data().photoURL
                navAcc.style.display = 'initial'
                //console.log(doc.data())
            });
        })

    } else
    {
        navButtons.forEach(button =>
        {
            button.style.display = "initial"
            button.style.pointerEvents = "initial"
        })
        console.log("user nu este logat");
        navAcc.style.display = 'none'
    }
});

const copyright = document.querySelector('.copyright');
const disclaimer = document.querySelector('.disclaimer-all');
const disclaimerOverlay = document.querySelector('#disclaimer-overlay');
const disclaimerContent = document.querySelector('.disclaimer');
const disclaimerBttn = document.querySelector(".close-disclaimer");

copyright.addEventListener('click', () =>
{
    disclaimer.classList.add('show')
    disclaimerContent.classList.add('show')
    disclaimerOverlay.classList.add('show');
})

disclaimerBttn.addEventListener('click', () =>
{
    disclaimer.classList.remove('show');
    disclaimerContent.classList.remove('show');
    disclaimerOverlay.classList.remove('show');
})
disclaimerOverlay.addEventListener('click', () =>
{
    disclaimer.classList.remove('show');
    disclaimerContent.classList.remove('show');
    disclaimerOverlay.classList.remove('show');
})

// Dark theme

const isDarkMode = localStorage.getItem('darkMode') === 'true';
const isLightMode = localStorage.getItem('lightMode') === 'true';

if (isDarkMode)
{
    document.body.classList.add('dark-theme');
}
if (!isLightMode && !isDarkMode)
{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        document.body.classList.add('dark-theme');
    } else
    {
        document.body.classList.remove('dark-theme');
    }
}

