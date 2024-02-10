import { lockScroll, unlockScroll } from "./utils.js";

const navAcc = document.querySelector('nav>.account>.acc-img')
const navButtons = document.querySelectorAll('nav>.account>button')

const moreMenuAcc = document.querySelector(".more-menu>.content>.acc-img");
const moreMenuAccButtons = document.querySelector(".more-menu>.content>.account");

firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        navButtons.forEach(button =>
        {
            button.style.display = "none"
        })
        moreMenuAccButtons.style.display = 'none'
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) =>
            {
                navAcc.querySelector('img').src = doc.data().photoURL;
                navAcc.style.display = 'initial';
                moreMenuAcc.style.display = 'initial';
                moreMenuAcc.querySelector('img').src = doc.data().photoURL;
            });
        })


    } else
    {
        navButtons.forEach(button =>
        {
            button.style.display = "initial"
            button.style.pointerEvents = "initial"
        })
        moreMenuAcc.style.display = 'none';
        moreMenuAccButtons.style.display = 'flex'
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
    disclaimer.classList.add('show');
    disclaimerContent.classList.add('show');
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

// More Menu

const moreMenuButton = document.querySelector('nav>.more');
const moreMenu = document.querySelector('.more-menu');
const moreMenuAccImage = document.querySelector('.more-menu>.content>.acc-img');
const moreMenuAccBttns = document.querySelector('.more-menu>.content>.account');
const navBar = document.querySelector("nav");
const moreMenuLinks = document.querySelector('.more-menu>.content>.links-list');

moreMenu.addEventListener('click', (e) =>
{
    if (!moreMenuLinks.contains(e.target) || !moreMenuAccImage.contains(e.target) || !moreMenuAccBttns.contains(e.target))
    {
        moreMenu.classList.remove('show');
    }


})

moreMenuLinks.addEventListener('click', (event) =>
{
    event.stopPropagation();
    event.stopImmediatePropagation();
});

moreMenuButton.addEventListener('click', (e) =>
{
    e.stopPropagation();
    moreMenu.classList.toggle('show');
    if (moreMenu.classList.contains('show'))
    {
        lockScroll();
        if (navBar.classList.contains('fixed') && !navBar.classList.contains('home'))
        {
            navBar.style.background = 'none';
        }

    }
    else
    {
        unlockScroll();
        if (!navBar.classList.contains('home'))
        {
            navBar.style.backgroundColor = 'var(--day-white01)'
        }

    }
})

