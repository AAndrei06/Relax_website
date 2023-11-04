import { lockScroll, unlockScroll, starsAnim } from "./utils.js";

// const slider = document.querySelector('#slider');
// const sliderValue = document.querySelector('.slider>.value');
// const sliderProgress = document.querySelector('.slider>.progress');

// function updateProgress()
// {

//     const progressValue = (slider.value / slider.max) * 100;
//     sliderProgress.style.width = `${progressValue}%`

//     const valueRect = sliderValue.getBoundingClientRect();
//     sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px + 4px) `
//     sliderValue.textContent = slider.value
// }

// slider.addEventListener('input', updateProgress);

// // Stars

// const stars = document.querySelectorAll(".filter-section>.content>.stars>div>svg")

// stars.forEach(star =>
// {
//     star.addEventListener('click', (e) =>
//     {
//         const starsFilled = starsAnim(stars, e.target, '.filter-section>.content>.stars>div>svg>.fill')
//     })
// })

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
}

function closeMenu()
{
    menuOverlay.classList.remove('show');
    menuSide.classList.remove('show');
    unlockScroll();
}

// Item Popup
const reviewSide = document.querySelector('.reviews-side')
const reviewSideBack = document.querySelector(".item-popup>.reviews-side>.content>.header>.first>.back")
const reviewSideBttn = document.querySelector('.item-popup>.text>.reviews>.num')
const reviewWordsSpan = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>.max>span')


reviewSideBttn.addEventListener('click', () =>
{
    reviewSide.classList.add('show');
})

reviewSideBack.addEventListener('click', () =>
{
    reviewSide.classList.remove('show');
    reviewWordsSpan.innerText = "0";

    createReviewBttn.classList.remove('active')
    reviewsDiv.classList.add('active');
    createReviewDiv.classList.remove('active');
    xSVG.classList.remove('active')
})

// Custom Mouse

const popupImageDiv = document.querySelector('.item-popup>.image');
const customMouse = document.querySelector('.item-popup>.image>.mouse');

let isMouseMoving = false;

popupImageDiv.addEventListener('mousemove', (e) =>
{
    if (!isMouseMoving)
    {
        isMouseMoving = true;
        requestAnimationFrame(() =>
        {
            const containerRect = popupImageDiv.getBoundingClientRect();
            const followerSize = 48;
            const x = e.clientX - containerRect.left - followerSize / 2;
            const y = e.clientY - containerRect.top - followerSize / 2;

            const maxX = containerRect.width - followerSize;
            const maxY = containerRect.height - followerSize;

            const clampedX = Math.min(Math.max(x, 0), maxX);
            const clampedY = Math.min(Math.max(y, 0), maxY);

            customMouse.style.left = clampedX + 'px';
            customMouse.style.top = clampedY + 'px';

            isMouseMoving = false;
        });
    }
});

const zoomImage = document.querySelector('.item-popup>.image>img')

popupImageDiv.addEventListener('mousedown', (e) =>
{
    const boundingBox = popupImageDiv.getBoundingClientRect();
    const clickX = e.clientX - boundingBox.left;
    const clickY = e.clientY - boundingBox.top;

    const zoomOriginX = (clickX / boundingBox.width) * 100 + '%';
    const zoomOriginY = (clickY / boundingBox.height) * 100 + '%';

    zoomImage.style.transformOrigin = `${zoomOriginX} ${zoomOriginY}`;
    zoomImage.classList.add('zoom');
});

window.addEventListener('mouseup', (e) =>
{
    zoomImage.classList.remove('zoom');
});

// Create Review

const createReviewBttn = document.querySelector(".item-popup>.reviews-side>.content>.header>button")
const xSVG = document.querySelector('.item-popup>.reviews-side>.content>.header>button>svg')

const reviewsDiv = document.querySelector(".item-popup>.reviews-side>.content>.reviews")
const createReviewDiv = document.querySelector('.item-popup>.reviews-side>.content>.create-review')

createReviewBttn.addEventListener('click', () =>
{
    createReviewBttn.classList.toggle('active')
    reviewsDiv.classList.toggle('active');
    createReviewDiv.classList.toggle('active');
    xSVG.classList.toggle('active')
})