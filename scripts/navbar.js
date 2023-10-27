const navbar = document.querySelector('.nav-bar')

let previousScrollPosition = window.scrollY;

window.addEventListener('scroll', () =>
{
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition < previousScrollPosition)
    {
        navbar.style.transform = 'translateY(0%)'
    }
    else
    {
        navbar.style.transform = 'translateY(-100%)'
    }

    previousScrollPosition = currentScrollPosition;
});