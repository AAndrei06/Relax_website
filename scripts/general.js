import { lockScroll, unlockScroll } from "./utils.js";

if (localStorage.getItem('language') == null){
    localStorage.setItem("language",'ro');
}

const navAcc = document.querySelector('nav>.account>.acc-img')
const navButtons = document.querySelectorAll('nav>.account>button')

const moreMenuAcc = document.querySelector(".more-menu>.content>.acc-img");
const moreMenuAccButtons = document.querySelector(".more-menu>.content>.account");
let is_admin = false;
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
                if (doc.data().admin){
                    is_admin = true;
                }
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
    if (is_admin){
        window.location.href = "/pages/orders.html";
    }
    /*
    disclaimer.classList.add('show');
    disclaimerContent.classList.add('show');
    disclaimerOverlay.classList.add('show');
    */
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
        navBar.classList.remove('more')
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
        navBar.classList.add('more')
    }
    else
    {
        navBar.classList.remove('more')
    }

})

