const copyright = document.querySelector('.copyright');
const disclaimer = document.querySelector('.disclaimer-all');
const disclaimerOverlay = document.querySelector('#disclaimer-overlay');
const disclaimerContent = document.querySelector('.disclaimer');
const disclaimerBttn = document.querySelector(".close-disclaimer");

copyright.addEventListener('click', () =>
{
    disclaimer.classList.add('show')
    disclaimerContent.classList.add('show')
})

disclaimerBttn.addEventListener('click', () =>
{
    disclaimer.classList.remove('show')
    disclaimerContent.classList.remove('show')
})
disclaimerOverlay.addEventListener('click', () =>
{
    disclaimer.classList.remove('show')
    disclaimerContent.classList.remove('show')
})