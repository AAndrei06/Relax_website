const root = document.documentElement;

const settingsEdit = document.querySelector('#edit');
const settingsSave = document.querySelector('#save');
const settingsCancel = document.querySelector('#cancel');

const settingsFileInput = document.querySelector(".block.actual>.content>.avatar>div>label>input");
const settingsFileLabel = document.querySelector(".block.actual>.content>.avatar>div>label");
const settingsProfileImage = document.querySelector(".block.actual>.content>.avatar>div>img");
const settingsDivs = document.querySelectorAll(".block.actual>.content>.settings>.setting>div");

settingsEdit.addEventListener('click', () =>
{
    settingsEdit.classList.remove('show');
    settingsSave.classList.add('show');
    settingsCancel.classList.add('show');
    settingsFileLabel.classList.add('show');
    settingsProfileImage.classList.remove('show');
    settingsDivs.forEach(div =>
    {
        div.classList.add('show');
    })
})
settingsCancel.addEventListener('click', () =>
{
    settingsEdit.classList.add('show');
    settingsSave.classList.remove('show');
    settingsCancel.classList.remove('show');
    settingsFileLabel.classList.remove('show');
    settingsProfileImage.classList.add('show');
    settingsDivs.forEach(div =>
    {
        div.classList.remove('show');
    })
})

const themeRadios = document.querySelectorAll('.block.actual>.content>.themes>.theme.theme>input');

const isDarkMode = localStorage.getItem('darkMode') === 'true';
const isLightMode = localStorage.getItem('lightMode') === 'true';


if (isDarkMode)
{
    Array.from(themeRadios)[2].checked = true
}
if (isLightMode)
{
    Array.from(themeRadios)[1].checked = true
}
if (!isLightMode && !isDarkMode)
{
    Array.from(themeRadios)[0].checked = true
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        document.body.classList.add('dark-theme');
        document.documentElement.style.colorScheme = 'dark';
    } else
    {
        document.body.classList.remove('dark-theme');
        document.documentElement.style.colorScheme = 'light';
    }
}

themeRadios.forEach(radio =>
{
    radio.addEventListener('input', () =>
    {
        if (radio.value == 'system')
        {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            {
                document.body.classList.add('dark-theme');
                document.documentElement.style.colorScheme = 'dark';
            } else
            {
                document.body.classList.remove('dark-theme');
                document.documentElement.style.colorScheme = 'light';

            }
            localStorage.setItem('darkMode', false);
            localStorage.setItem('lightMode', false);
        }
        if (radio.value == 'light')
        {
            document.body.classList.remove('dark-theme');
            document.documentElement.style.colorScheme = 'light';
            localStorage.setItem('darkMode', false);
            localStorage.setItem('lightMode', true);
        }
        if (radio.value == 'dark')
        {
            document.body.classList.add('dark-theme');
            document.documentElement.style.colorScheme = 'dark';
            localStorage.setItem('darkMode', true);
            localStorage.setItem('lightMode', false);
        }
    })
})

// Language translation

const languageRadios = document.querySelectorAll('.block.actual>.content>.themes>.theme.lang>input');

const language = localStorage.getItem('language') || 'ro';

if (language == 'ro')
{
    Array.from(languageRadios)[0].checked = true;
}
if (language == 'ru')
{
    Array.from(languageRadios)[1].checked = true;
}
if (language == 'en')
{
    Array.from(languageRadios)[2].checked = true;
}

languageRadios.forEach(radio =>
{
    radio.addEventListener('input', () =>
    {
        if (radio.value == 'ro')
        {
            localStorage.setItem("language", "ro");
        }
        if (radio.value == 'ru')
        {
            localStorage.setItem("language", "ru");
        }
        if (radio.value == 'en')
        {
            localStorage.setItem("language", "en");
        }
    })
})