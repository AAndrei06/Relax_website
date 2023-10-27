const heroSection = document.querySelector('.hero');
const navbar = document.querySelector('.nav-bar')

let navbarBool = true;

let navbarTransitionTimeout;
let navbarFixedTimeout;

const observer = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (!entry.isIntersecting && !navbar.classList.contains("fixed"))
        {
            navbar.style.transition = 'initial'
            navbar.classList.add("fixed");
            clearTimeout(navbarTransitionTimeout)
            navbarTransitionTimeout = setTimeout(() =>
            {
                navbar.style.transition = 'transform 0.15s'
            }, 150)
            navbarBool = true;
        }
        if (entry.isIntersecting)
        {
            navbarBool = false;
            clearTimeout(navbarFixedTimeout)
            navbarFixedTimeout = setTimeout(() =>
            {
                navbar.classList.remove("fixed");
                navbar.style.transition = 'initial'
                navbar.style.transform = 'translateY(0%)'

            }, 150)

        }

    });
});

observer.observe(heroSection);

let previousScrollPosition = window.scrollY;

window.addEventListener('scroll', () =>
{
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition < previousScrollPosition && navbarBool)
    {
        navbar.style.transform = 'translateY(0%)'
    }
    else if (navbar.classList.contains('fixed'))
    {
        navbar.style.transform = 'translateY(-100%)'
    }

    previousScrollPosition = currentScrollPosition;
});