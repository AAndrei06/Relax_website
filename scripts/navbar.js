const navbar = document.querySelector('.nav-bar')

let previousScrollPosition = window.scrollY;

window.addEventListener('scroll', () =>
{
    const currentScrollPosition = window.scrollY;

    const rect = navbar.getBoundingClientRect();

    if (currentScrollPosition > rect.height)
    {
        if (currentScrollPosition < previousScrollPosition)
        {
            navbar.classList.add('fixed');
            navbar.style.transform = 'translateY(0%)'
        }
        else
        {
            navbar.classList.remove('fixed');
            navbar.style.transform = 'translateY(-100%)';
        }
    }
    if (currentScrollPosition == 0)
    {
        navbar.classList.remove('fixed');
    }

    previousScrollPosition = currentScrollPosition;
});