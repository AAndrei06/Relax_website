import { focusItem } from "./utils.js";

const commentTextarea = document.querySelector('.contents>.end>#add-comment>.textarea>textarea');
const commentWordsSpan = document.querySelector('.contents>.end>#add-comment>.textarea>.max');

const navbar = document.querySelector('.nav-bar');
navbar.style.transition = 'initial';
navbar.style.transform = 'translateY(0%)'

let pastTextareaValue = 0;

commentTextarea.addEventListener('input', (e) =>
{
    if (e.target.value.length <= 500)
    {
        commentWordsSpan.innerText = `${e.target.value.length}/500`;
        pastTextareaValue = e.target.value
    }
    else
    {
        e.target.value = pastTextareaValue;
    }
})

// Added Remove

const addedContent = document.querySelector('.added');

Array.from(addedContent.children).forEach(added =>
{
    added.addEventListener('input', (e) =>
    {
        if (e.target.innerText == '')
        {
            e.target.remove();
        }
        console.log(e.target.innerText)
    })
})

// Add Text

const adminBigText = document.querySelector('.admin-buttons>.big-text');

adminBigText.addEventListener('click', () =>
{
    addedContent.innerHTML += `<div contenteditable="true" class="header" >Test</div>`
    focusItem(addedContent.children[addedContent.children.length - 1])
})

const adminSmallText = document.querySelector('.admin-buttons>.small-text');

adminSmallText.addEventListener('click', () =>
{
    addedContent.innerHTML += `<div contenteditable="true" class="paragraph" >Test</div>`
    focusItem(addedContent.children[addedContent.children.length - 1])
})

// Like

const heart = document.querySelector('.contents>.end>.wrap>.likes>svg');

heart.addEventListener('click', (e) =>
{
    e.target.querySelector('.fill').classList.toggle('show')
})

// Progress Bar

const endSection = document.querySelector('.end');
const endSectionRect = endSection.getBoundingClientRect();
var endSectionStyles = window.getComputedStyle(endSection);
var endSectionMarginTop = endSectionStyles.getPropertyValue('margin-top');
const progressBar = document.querySelector('.progress-bar')

function assignProgress()
{
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    let scrollPercentage = (scrollTop / (scrollHeight - endSectionRect.height - parseFloat(endSectionMarginTop) - 100)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
}

document.addEventListener('scroll', () =>
{
    assignProgress()

});