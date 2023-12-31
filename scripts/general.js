const navAcc = document.querySelector('nav>.account>.acc-img')
const navButtons = document.querySelectorAll('nav>.account>button')
// document.getElementsByTagName("body")[0].style.display = "none";
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
                console.log(doc.data().admin)
                navAcc.style.display = 'initial'
            });
        })


    } else
    {
        navButtons.forEach(button =>
        {
            button.style.display = "initial"
            button.style.pointerEvents = "initial"
        })

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