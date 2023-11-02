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
const reviewSide = document.querySelector('.reviews-side')
const reviewSideBack = document.querySelector(".item-popup>.reviews-side>.content>.header>.back")
const reviewSideBttn = document.querySelector('.item-popup>.text>.reviews>.num')

reviewSideBttn.addEventListener('click', () =>
{
    reviewSide.classList.add('show');
})

reviewSideBack.addEventListener('click', () =>
{
    reviewSide.classList.remove('show');
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