firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) =>
            {
                console.log(doc.data())
                //Ce am facut?
                /*
                In baza de date am salvat o copie al fiecarui user,un fel de profil,si acolo am salvat si
                poza de profil,acum am extras acest element din baza de date si am afisat linkul pozei din storage
                tu iei linkul acesta si il pui in src la img,asta e tot,am afisat si obiectul json la user,dar nu iti va trebui precis.
                */
            });
        })
    } else
    {
        console.log("user nu este logat");
    }
});


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

// Animations

const phoneSVG = document.querySelector(".type2>.content>.main>button>a>svg")

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