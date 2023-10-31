import { lockScroll, unlockScroll } from "./utils.js";

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider>.value');
const sliderProgress = document.querySelector('.slider>.progress');



function updateProgress()
{

    const progressValue = (slider.value / slider.max) * 100;
    sliderProgress.style.width = `${progressValue}%`

    const valueRect = sliderValue.getBoundingClientRect();
    sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px + 4px) `
    sliderValue.textContent = slider.value
}

slider.addEventListener('input', updateProgress);

// Stars

const stars = document.querySelectorAll(".filter-section>.content>.stars>div>svg")

let starsSelected = 5;

function assignStars(star)
{

    const indexClicked = Array.from(stars).indexOf(star);

    const starsFilled = document.querySelectorAll('.filter-section>.content>.stars>div>svg>.fill:not(.not)').length;

    if (indexClicked >= 0 && indexClicked < stars.length)
    {
        if (indexClicked + 1 <= starsFilled)
        {
            for (let i = indexClicked + 1; i < stars.length; i++)
            {
                stars[i].children[2].classList.add('not');
            }
        }
        else
        {
            for (let i = 0; i < indexClicked + 1; i++)
            {
                stars[i].children[2].classList.remove('not');
            }
        }
    }

    return indexClicked + 1;

}

stars.forEach(star =>
{
    star.addEventListener('click', (e) =>
    {
        const starsFilled = assignStars(e.target)
    })
})

// Search placeholder

const search = document.querySelector('.filter-section>.content>.search>input')
const searchPlaceholder = document.querySelector('.filter-section>.content>.search>.placeholder>span')

search.addEventListener('focus', () =>
{
    searchPlaceholder.style.opacity = '0'
})
search.addEventListener('blur', (e) =>
{
    if (e.target.value == '')
    {
        searchPlaceholder.style.opacity = '1'
    }

})

// Categories

const cateogries = document.querySelectorAll('.filter-section>.content>.categories>.popup>.content>.category')

cateogries.forEach(category =>
{
    category.addEventListener('click', (e) =>
    {
        e.target.classList.toggle('selected')
    })
})

const categoriesPopup = document.querySelector(".filter-section>.content>.categories>.popup");
const categoriesBttn = document.querySelector(".filter-section>.content>.categories")

document.addEventListener('click', (event) =>
{
    if (!categoriesPopup.contains(event.target))
    {
        categoriesPopup.classList.remove('show');
    }
});

categoriesBttn.addEventListener('click', (e) =>
{
    e.stopPropagation();
    categoriesPopup.classList.toggle('show')
})



// Prevent clicks within the categoriesPopup from closing it
categoriesPopup.addEventListener('click', (event) =>
{
    event.stopPropagation();
});

// Menu 

const menuButton = document.querySelector(".menu-bttn");
const menuOverlay = document.querySelector("#menu-overlay");
const menuSide = document.querySelector('.menu-side');

let xDeletes;

menuButton.addEventListener('click', () =>
{
    openMenu()
})

menuOverlay.addEventListener('click', () =>
{
    closeMenu()
})

function openMenu()
{
    menuOverlay.classList.add('show');
    menuSide.classList.add('show');
    lockScroll();
    xDeletes = document.querySelectorAll('.menu-side>.wrap>.orders>.order>.text>.name>.delete')
}

function closeMenu()
{
    menuOverlay.classList.remove('show');
    menuSide.classList.remove('show');
    unlockScroll();
}

// Item Popup

const itemOverlay = document.querySelector('#item-overlay');
const itemPopup = document.querySelector(".item-popup");
const item = document.querySelector(".menu-section>.content>.items>.item");

item.addEventListener('click', () =>
{
    itemPopup.classList.add('show');
    itemOverlay.classList.add('show');
    lockScroll();
})
itemOverlay.addEventListener('click', () =>
{
    itemPopup.classList.remove('show');
    itemOverlay.classList.remove('show');
    unlockScroll();
})