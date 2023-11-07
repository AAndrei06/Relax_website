const root = document.documentElement;

const settingsEdit = document.querySelector('#edit');
const settingsSave = document.querySelector('#save');
const settingsCancel = document.querySelector('#cancel');

const settingsFileInput = document.querySelector(".block.actual>.content>.avatar>div>input");
const settingsProfileImage = document.querySelector(".block.actual>.content>.avatar>div>img");
const settingsDivs = document.querySelectorAll(".block.actual>.content>.settings>.setting>div")

settingsEdit.addEventListener('click', () =>
{
    settingsEdit.classList.remove('show');
    settingsSave.classList.add('show');
    settingsCancel.classList.add('show');
    settingsFileInput.classList.add('show')
    settingsProfileImage.classList.remove('show')
    settingsDivs.forEach(div =>
    {
        div.classList.add('show')
    })
})
settingsCancel.addEventListener('click', () =>
{
    settingsEdit.classList.add('show');
    settingsSave.classList.remove('show');
    settingsCancel.classList.remove('show');
    settingsFileInput.classList.remove('show')
    settingsProfileImage.classList.add('show')
    settingsDivs.forEach(div =>
    {
        div.classList.remove('show')
    })
})

const themeRadios = document.querySelectorAll('.block.actual>.content>.themes>.theme>input');

const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode)
{
    document.body.classList.add('dark-theme');
    Array.from(themeRadios)[2].checked = true
}
else
{
    Array.from(themeRadios)[1].checked = true
}

themeRadios.forEach(radio =>
{
    radio.addEventListener('input', () =>
    {
        if (radio.value == 'light')
        {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('darkMode', false);
        }
        if (radio.value == 'dark')
        {
            document.body.classList.add('dark-theme');
            localStorage.setItem('darkMode', true);
        }
    })
})
