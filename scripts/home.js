document.addEventListener("DOMContentLoaded", (event) =>
{
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    const pizzaAnim = document.querySelector('.pizza')
    const headerSection = document.querySelector('header')
    const imgReviews = document.querySelector('.img-sections>.reviews')
    const imgSections = document.querySelector('.img-sections')
    const imgSection01 = document.querySelector('#img-section01')
    // const info01 = document.querySelector('#img-section01>.container')
    const imgSection02 = document.querySelector('#img-section02')
    // const info02 = document.querySelector('#img-section02>.container')
    const imgSection03 = document.querySelector('#img-section03')
    // const info03 = document.querySelector('#img-section03>.container')

    const reviewName = document.querySelector('#review-name')
    const reviewContent = document.querySelector('#review-content')
    const reviewAuthor = document.querySelector('#review-author')
    const reviewNumber = document.querySelector('#review-number')
    const prevReviewArrow = document.querySelector('#prev-review-arrow')
    const nextReviewArrow = document.querySelector('#next-review-arrow')

    const reviewsText = {
        pizza: [
            {
                name: "Ana Dobre",
                content: "“Delicioasă! Blatul subțire și crocant, topping-urile proaspete. Recomand cu drag!”"
            },
            {
                name: "Ioan Vasilescu",
                content: "“Ingredientele sunt echilibrate și blatul e crocant. Atmosfera e relaxantă și personalul amabil.”"
            },
            {
                name: "Radu Roman",
                content: "“Pizza Capricioasa a fost o alegere excelentă. Gustul e incredibil, iar porția e mai mult decât generoasă.”"
            }
        ],
        sushi: [
            {
                name: "Mihai Stoica",
                content: "“Am comandat sushi și am fost foarte mulțumit. Ingrediente proaspete, gust autentic și prezentare impecabilă.”"
            },
            {
                name: "Ioana Petrescu",
                content: "“Sushi-ul m-a impresionat. Localul e foarte primitor și curat. Cu siguranță o să revin!”"
            },
            {
                name: "Andrei Constantinescu",
                content: "“Sushi-ul e absolut minunat! Rolele sunt bine echilibrate și foarte gustoase.”"
            }
        ],
        shaorma: [
            {
                name: "Marius Dumitru",
                content: "“Am comandat shaorma la Relax și a fost extraordinară. Carnea suculentă și legumele proaspete!”"
            },
            {
                name: "Cristina Pop",
                content: "“Shaorma m-a impresionat cu adevărat. Gustul e incredibil, iar porția generoasă.”"
            },
            {
                name: "Bogdan Ionescu",
                content: "“Shaorma de la Relax e de neegalat! Carnea e fragedă, sosurile delicioase și legumele proaspete.”"
            }
        ]
    }

    // HEADER ANIMATION

    gsap.to(pizzaAnim, {
        left: "128px",
        rotation: 360,
        scrollTrigger: {
            trigger: headerSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: true
        },
    });


    // PAST


    // FIRST SECTION ANIMATIONS

    let pizzaTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: "top top",
            end: "bottom top",
            markers: true,
            scrub: true,
        }
    });
    pizzaTimeline.to(pizzaAnim, { rotation: 0, ease: "power1.inOut", duration: 0 }, 0) // tilt to the left
        .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
        .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }) // tilt to the left
    // .to(pizzaAnim, { rotation: 16, ease: "power1.inOut" }) // tilt to the right
    // .to(pizzaAnim, { rotation: -16, ease: "power1.inOut" }) // tilt to the right




    ScrollTrigger.create({
        trigger: imgSections,
        start: "top top",
        end: "bottom center",
        scrub: true,
        pin: imgReviews,
        markers: true
    });


    // NEXT ARROW TIMELINE

    let sectionHeight01 = imgSection01.offsetHeight;
    let sectionHeight02 = imgSection02.offsetHeight;
    let sectionHeight03 = imgSection03.offsetHeight;

    let nextReviewArrowTL = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${sectionHeight01 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${sectionHeight01 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });


    let nextReviewArrowTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL2.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL2.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    // REVIEW CHANGE

    let textChangeTL1 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${sectionHeight01 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[1].content
                reviewAuthor.innerHTML = reviewsText.pizza[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[0].content
                reviewAuthor.innerHTML = reviewsText.pizza[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL2 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection01,
            start: () => `+=${(sectionHeight01 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[2].content
                reviewAuthor.innerHTML = reviewsText.pizza[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[1].content
                reviewAuthor.innerHTML = reviewsText.pizza[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });


    // SECOND SECTION

    let pizzaLeaveTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,
        }
    });
    pizzaLeaveTimeline.to(pizzaAnim, { left: "0px", ease: "power1.inOut", opacity: 0, rotation: 15 })

    const sushiAnim = document.querySelector('.sushi')

    let sushiEnterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,
        }
    });
    sushiEnterTimeline.to(sushiAnim, { left: "128px", ease: "power1.inOut", opacity: 1 })
        .to(sushiAnim, { y: "-20px", repeat: 3, yoyo: true, duration: 0.2 }, 0);


    let textChangeTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,

            onEnter: () =>
            {
                reviewName.innerHTML = "Sushi"
                reviewContent.innerHTML = reviewsText.sushi[0].content
                reviewAuthor.innerHTML = reviewsText.sushi[0].name
                reviewNumber.innerHTML = 1;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.pizza[2].content
                reviewAuthor.innerHTML = reviewsText.pizza[2].name
                reviewNumber.innerHTML = 3;
                reviewName.innerHTML = "Pizza Capricioasa"
            },

        }
    });

    let section02Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: "top top",
            end: "bottom top",
            markers: true,
            scrub: true,
        }
    });
    section02Timeline.to(sushiAnim, { y: "-20px", repeat: 5, yoyo: true, }, 0)



    let nextReviewArrowTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL3.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL3 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL3.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    let nextReviewArrowTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL4.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL4.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    // TEXT CHANGE 02



    let textChangeTL4 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${sectionHeight02 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[1].content
                reviewAuthor.innerHTML = reviewsText.sushi[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[0].content
                reviewAuthor.innerHTML = reviewsText.sushi[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection02,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[2].content
                reviewAuthor.innerHTML = reviewsText.sushi[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[1].content
                reviewAuthor.innerHTML = reviewsText.sushi[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });

    // SHAORMA ANIMATION

    const shaormaAnim = document.querySelector('.shaorma')

    let sushiLeaveTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,
        }
    });
    sushiLeaveTimeline.to(sushiAnim, { left: 0, y: "0px", duration: 0.2, opacity: 0 })


    let shaormaEnterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,
        }
    });
    shaormaEnterTimeline.to(shaormaAnim, { left: "128px", ease: "power1.inOut", opacity: 1 })
        .to(shaormaAnim, { rotation: 15 }, 0);

    let section03Timeline = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "bottom center",
            markers: true,
            scrub: true,
            onLeave: () =>
            {
                shaormaAnim.style.position = "absolute";
                shaormaAnim.style.top = "100%";
                section03Timeline.pause();
            },
            onEnterBack: () =>
            {
                shaormaAnim.style.position = "fixed";
                shaormaAnim.style.top = "50%";
                section03Timeline.resume();
            }
        }
    });
    section03Timeline.to(shaormaAnim, { rotation: -5, ease: "power1.inOut", yoyo: true, repeat: 5 }, 0)

    // TEXT CHANGE 03

    let textChangeTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: "top top",
            end: "+=350px",
            markers: true,
            scrub: true,

            onEnter: () =>
            {
                reviewName.innerHTML = "Shaorma"
                reviewContent.innerHTML = reviewsText.shaorma[0].content
                reviewAuthor.innerHTML = reviewsText.shaorma[0].name
                reviewNumber.innerHTML = 1;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.sushi[2].content
                reviewAuthor.innerHTML = reviewsText.sushi[2].name
                reviewNumber.innerHTML = 3;
                reviewName.innerHTML = "Sushi"
            },

        }
    });

    let textChangeTL7 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[1].content
                reviewAuthor.innerHTML = reviewsText.shaorma[1].name
                reviewNumber.innerHTML = 2;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[0].content
                reviewAuthor.innerHTML = reviewsText.shaorma[0].name
                reviewNumber.innerHTML = 1;

            },
        }
    });


    let textChangeTL8 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight03 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,

            onEnter: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[2].content
                reviewAuthor.innerHTML = reviewsText.shaorma[2].name
                reviewNumber.innerHTML = 3;
            },
            onLeaveBack: () =>
            {
                reviewContent.innerHTML = reviewsText.shaorma[1].content
                reviewAuthor.innerHTML = reviewsText.shaorma[1].name
                reviewNumber.innerHTML = 2;
            },

        }
    });

    // ARROWS

    let nextReviewArrowTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL5.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL5 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${sectionHeight03 / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL5.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });

    let nextReviewArrowTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    nextReviewArrowTL6.to(nextReviewArrow, { x: 4 }, 0)
        .to(nextReviewArrow, { x: 0 });

    let prevReviewArrowTL6 = gsap.timeline({
        scrollTrigger: {
            trigger: imgSection03,
            start: () => `+=${(sectionHeight02 * 2) / 3}px`,
            end: () => `+=100px`,
            markers: true,
            scrub: true,
        }
    });

    prevReviewArrowTL6.to(prevReviewArrow, { x: -4 }, 0)
        .to(prevReviewArrow, { x: 0 });


});