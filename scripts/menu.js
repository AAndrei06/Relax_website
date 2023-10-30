const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider>.value');

// Function to update the progress width
function updateProgress()
{

    const progressValue = (slider.value / slider.max) * 100;
    // slider.style.setProperty('--progress-width', `${progressValue}%`);

    const valueRect = sliderValue.getBoundingClientRect();
    sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px) `
    sliderValue.textContent = slider.value
}

// Add an event listener to the slider to update the progress on input change
slider.addEventListener('input', updateProgress);