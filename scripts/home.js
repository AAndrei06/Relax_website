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
            navbar.classList.remove('home');
            navbar.style.backgroundColor = 'var(--day-white01)'
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
                navbar.classList.add('home');
                navbar.style.background = 'none';
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
        navbar.classList.remove('more')
    }

    previousScrollPosition = currentScrollPosition;
});

// Animations

const phoneSVG = document.querySelector("#phone-svg")

const phoneObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            phoneSVG.classList.add("anim")
        }


    });
});

phoneObserver.observe(phoneSVG);

const arrowSVG = document.querySelector("#arrow-svg")

const arrowObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            arrowSVG.classList.add("anim")
        }

    });
});

arrowObserver.observe(arrowSVG);

const articles = document.querySelector(".articles-section>.content>.articles")

const articlesObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            Array.from(articles.children).forEach(a =>
            {
                a.classList.add("anim")
            })

        }


    });
});

articlesObserver.observe(articles);

let article1 = document.querySelector('#article1');
let article2 = document.querySelector('#article2');
let article3 = document.querySelector('#article3');

let articleHTML = [article1, article2, article3];

articlesDB.get().then((querySnapshot) =>
{
    let articles = [];
    querySnapshot.forEach((object) =>
    {
        articles.push(object);
    })

    articles.sort(compar);

    articleHTML.forEach((art, index) =>
    {
        if (articles[index] !== undefined)
        {
            art.href = `/pages/articol.html?id=${articles[index].id}`

            let artData = art.querySelector('.article>.data>.date');
            artData.innerHTML = `${formatDate(articles[index].data().datePosted)}`;

            let artName = art.querySelector('.article>.data>h3');
            artName.innerHTML = `${articles[index].data().name}`;

            artImage = art.querySelector('.article>img');
            artImage.src = `${articles[index].data().photoURL}`;
        }

    })
})

const starsDiv = document.querySelectorAll('.stars')

const starsObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            starsDiv.forEach(div =>
            {
                Array.from(div.children).forEach((star, index) =>
                {
                    star.style.animation = `jump 0.35s ease-in-out forwards ${index * 0.15}s`;
                    const fill = star.querySelector('.fill')
                    fill.style.animation = `big-star 0.25s ease-in-out forwards ${index * 0.15}s`;
                })
            })

        }


    });
});

starsObserver.observe(starsDiv[0]);

const services = document.querySelectorAll('.services-section>.content>.services>.service')

const servicesObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            services.forEach((div, index) =>
            {
                div.style.animation = `ascend 0.35s ease-in-out forwards ${index * 0.15}s`;

            })

        }


    });
});

servicesObserver.observe(services[0]);

// Stats animation

const statsSection = document.querySelector('.stats');
const statSVGs = document.querySelectorAll('.stats>.content>.stat>div>svg');

const starStatSpan = document.querySelector("#star-stat-span"); // 4.1
const timeStatSpan = document.querySelector("#time-stat-span"); // 22:00
const menuStatSpan = document.querySelector("#menu-stat-span"); // +50

let starStatSpanInterval;
let starStatNr = 0.0;

let timeStatSpanInterval;
let timeStatNr = 0;

let menuStatSpanInterval;
let menuStatNr = 0;

const statsObserver = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            statSVGs.forEach((div, index) =>
            {
                div.style.animation = `descend 0.35s ease-in-out forwards ${index * 0.10}s`;
            })

            starStatSpanInterval = setInterval(() =>
            {

                if (starStatNr <= 4.1)
                {
                    starStatNr += 0.1;
                    starStatSpan.innerText = `${starStatNr.toFixed(1)}`;
                }
                else
                {
                    clearInterval(starStatSpanInterval)
                }

            }, 25);

            timeStatSpanInterval = setInterval(() =>
            {

                if (timeStatNr < 22)
                {
                    timeStatNr += 1;
                    timeStatSpan.innerText = `${timeStatNr}:00`;
                }
                else
                {
                    clearInterval(timeStatSpanInterval)
                }

            }, 50);

            menuStatSpanInterval = setInterval(() =>
            {

                if (menuStatNr < 50)
                {
                    menuStatNr += 1;
                    menuStatSpan.innerText = `+${menuStatNr}`;
                }
                else
                {
                    clearInterval(menuStatSpanInterval)
                }

            }, 20);

        }
    });
});

statsObserver.observe(statsSection);