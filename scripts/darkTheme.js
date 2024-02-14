// Dark theme

const isDarkMode = localStorage.getItem('darkMode') === 'true';
const isLightMode = localStorage.getItem('lightMode') === 'true';



if (isDarkMode)
{
    document.body.classList.add('dark-theme');
    document.documentElement.style.colorScheme = 'dark';
}
if (!isLightMode && !isDarkMode)
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
}
