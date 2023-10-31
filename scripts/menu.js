const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider>.value');
const sliderProgress = document.querySelector('.slider>.progress');

// const valueRect = sliderValue.getBoundingClientRect();
// sliderValue.style.left = `calc(100% - 16px) `
// sliderValue.textContent = "500"

// Function to update the progress width
function updateProgress()
{

    const progressValue = (slider.value / slider.max) * 100;
    // slider.style.setProperty('--progress-width', `${progressValue}%`);
    sliderProgress.style.width = `${progressValue}%`

    const valueRect = sliderValue.getBoundingClientRect();
    sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px + 4px) `
    sliderValue.textContent = slider.value
}

// Add an event listener to the slider to update the progress on input change
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