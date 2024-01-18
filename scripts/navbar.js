const navbar = document.querySelector('.nav-bar')

let previousScrollPosition = window.scrollY;


window.addEventListener('scroll', () =>
{
    const currentScrollPosition = window.scrollY;

    const rect = navbar.getBoundingClientRect();

    if (currentScrollPosition > rect.height)
    {
        navbar.style.transition = 'initial'
        navbar.classList.add('fixed');

        if (currentScrollPosition < previousScrollPosition)
        {
            navbar.style.transform = 'translateY(0%)'
            navbar.style.transition = 'transform 0.15s'
        }
        else if (navbar.classList.contains('fixed'))
        {
            navbar.style.transform = 'translateY(-100%)';
            // navbar.style.transition = 'transform 0.15s';
        }
    }
    if (currentScrollPosition == 0)
    {
        navbar.classList.remove('fixed');
    }

    previousScrollPosition = currentScrollPosition;
});