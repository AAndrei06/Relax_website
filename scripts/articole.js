import { displayImage } from "./utils.js"

const articlePopupOverlay = document.querySelector('#article-overlay');
const articlePopup = document.querySelector('.article-popup');
const articleFileInputLabel = document.querySelector('.img-add-label');
const articleFileInput = document.querySelector("#article-img-add");
const previewImg = document.querySelector('.preview-img');

const allArticles = document.querySelectorAll('.articol');
const addArticleBttn = document.querySelector('.add-article');
const deleteArticleBttn = document.querySelector('.article-popup>.buttons>button.delete')


allArticles.forEach(article =>
{
    article.children[0].children[1].addEventListener('click', (e) =>
    {
        e.stopPropagation();
        e.preventDefault()
        openArticlePopup();
    })
})

function openArticlePopup()
{
    articlePopupOverlay.classList.add('show');
    articlePopup.classList.add('show');
}

function closeArticlePopup()
{
    articlePopupOverlay.classList.remove('show');
    articlePopup.classList.remove('show');
    articlePopup.reset();

    setTimeout(() =>
    {
        deleteArticleBttn.classList.add('active')
    }, 100)



    articleFileInput.value = ''
    previewImg.src = ''

    previewImg.classList.remove('show');
    articleFileInputLabel.classList.add('show');
    articleFileInputLabel.children[0].innerHTML = 'Adaugă imaginea'

}
addArticleBttn.addEventListener('click', () =>
{
    deleteArticleBttn.classList.remove('active')
    openArticlePopup()
})

articlePopupOverlay.addEventListener('click', () =>
{
    closeArticlePopup();
})

articleFileInput.addEventListener('change', (e) =>
{
    let selectedFile = e.target.files[0];

    if (selectedFile)
    {
        displayImage(selectedFile, previewImg);
        previewImg.classList.add('show');
        articleFileInputLabel.classList.remove('show');
        articleFileInputLabel.children[0].innerHTML = 'Schimbă imaginea'
    }
});

