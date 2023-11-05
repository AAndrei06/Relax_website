import { lockScroll, unlockScroll, assignStars, starsAnim, deleteTextAnim, generateMongoLikeID, formatDate } from "../utils.js";

const itemQuantityMap = new Map();
let currentID = '';
let sideMenuIDs = [];

const itemOverlay = document.querySelector('#item-overlay');
const itemPopup = document.querySelector(".item-popup");

const popupImage = document.querySelector('.item-popup>.image>img')
const popupName = document.querySelector('.item-popup>.text>.header>.main>.name')
const popupPrice = document.querySelector('.item-popup>.text>.header>.main>.price')
const popupStars = document.querySelector('.item-popup>.text>.reviews>.stars')
const popupReviewsNum = document.querySelector('.item-popup>.text>.reviews>.num>.reviews-num')
const popupDescription = document.querySelector('.item-popup>.text>.description')
const popupMasa = document.querySelector('.item-popup>.text>.end>.masa>span')
const popupItemQuantity = document.querySelector('.item-popup>.text>.end>button>span')
const popupButton = document.querySelector('.item-popup>.text>.end>button')
const popupReviewsDiv = document.querySelector(".item-popup>.reviews-side>.content>.reviews")

const reviewSide = document.querySelector('.reviews-side')
const reviewStars = document.querySelector('.item-popup>.reviews-side>.content>.header>.first>.reviews-stats>.stars-div>.stars')
const reviewReviewsNum = document.querySelector('.item-popup>.reviews-side>.content>.header>.first>.reviews-stats>.stars-div>.reviews-num')

const newPoint = document.querySelector(".menu-bttn>.wrap>.new");
const ordersDiv = document.querySelector(".menu-side>.wrap>.orders");
const ordersPriceDiv = document.querySelector('.menu-side>.wrap>.checkout>span>.price');
const ordersEmpty = document.querySelector('.menu-side>.wrap>.empty');

const checkoutButton = document.querySelector('.menu-side>.wrap>.checkout>button');
const checkoutTotalSpan = document.querySelector('.menu-side>.wrap>.checkout>span');

const allSections = document.querySelector('.categories-sections')

const menuItems =
{
    "pizza-section": [
        {
            name: "BBQ Pizza Super Crocant",
            price: "110",
            img: "../assets/Account/pizza.png",
            reviews: [
                {
                    name: "Andrei Arseni",
                    date: "7 septembrie 2023",
                    stars: "5",
                    description: "Marcare buna",
                    img: "../assets/Account/pizza.png"
                },
                {
                    name: "Artur Gisca",
                    date: "3 noiembrie 2023",
                    stars: "4",
                    description: "Marcarea mere",
                    img: "../assets/Account/pizza2.png"
                },
                {
                    name: "Artur Gisca",
                    date: "3 noiembrie 2023",
                    stars: "1",
                    description: "Leva",
                    img: "../assets/Account/pizza2.png"
                },

            ],
            description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
            masa: "0.720",
            uid: "Abcwasda42wda421sfa",
        },
        {
            name: "Omleta Bacon cu Ciuperci",
            price: "135",
            img: "../assets/Account/pizza2.png",
            reviews: [],
            description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
            masa: "0.220",
            uid: "dsadaw",
        },
        {
            name: "Salata",
            price: "35",
            img: "../assets/Account/pizza.png",
            reviews: [],
            description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
            masa: "0.220",
            uid: "dsad312312574aw",
        },


    ],
    "gustari-section": [

        {
            name: "Invers",
            price: "175",
            img: "../assets/Account/pizza2.png",
            reviews: [{
                name: "Andrei Arseni",
                date: "7 septembrie 2023",
                stars: "5",
                description: "Marcare buna",
                img: "../assets/Account/pizza.png"
            },],
            description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
            masa: "0.220",
            uid: "dsadawdawadwawdqwr2141daw",
        },
        {
            name: "Vasea Pizza",
            price: "50",
            img: "../assets/Account/pizza.png",
            reviews: [
                {
                    name: "Andrei Arseni",
                    date: "7 septembrie 2023",
                    stars: "5",
                    description: "Marcare buna",
                    img: "../assets/Account/pizza.png"
                },
                {
                    name: "Artur Gisca",
                    date: "3 noiembrie 2023",
                    stars: "4",
                    description: "Marcarea mere",
                    img: "../assets/Account/pizza2.png"
                },
                {
                    name: "Artur Gisca",
                    date: "3 noiembrie 2023",
                    stars: "1",
                    description: "Leva",
                    img: "../assets/Account/pizza2.png"
                },

            ],
            description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
            masa: "0.720",
            uid: "Abcwasda42wda4231223121sfa",
        },

    ]

}

// Filter

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider>.value');
const sliderProgress = document.querySelector('.slider>.progress');
const mainSearch = document.querySelector('.filter-section>.content>.search>input')

const categories = document.querySelectorAll('.filter-section>.content>.categories>.popup>.content>.category')

let price = 500;
let mainStarsFilled = 5;
let categoriesArray = [];
updateMainCategories();

// Price

function updateProgress()
{

    const progressValue = (slider.value / slider.max) * 100;
    sliderProgress.style.width = `${progressValue}%`

    const valueRect = sliderValue.getBoundingClientRect();
    sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px + 4px) `
    sliderValue.textContent = slider.value
    price = slider.value;
    filterAndRender()
}

slider.addEventListener('input', updateProgress);

mainSearch.addEventListener('input', () =>
{
    filterAndRender()
})

// Stars

const stars = document.querySelectorAll(".filter-section>.content>.stars>div>svg")

stars.forEach(star =>
{
    star.addEventListener('click', (e) =>
    {
        mainStarsFilled = starsAnim(stars, e.target, '.filter-section>.content>.stars>div>svg>.fill')
        filterAndRender()
    })
})


filterAndRender()

function filterMenuItems(menuItems, criteria)
{

    return menuItems.filter(item =>
    {
        const reviews = item.reviews;
        let totalStars = 0;

        reviews.forEach(review =>
        {
            totalStars += Number(review.stars);
        });

        const stars = Math.round(totalStars / reviews.length);

        return criteria.every(criterion =>
        {
            const [field, value] = criterion;

            if (field === 'stars' && stars > value)
            {
                return false;
            }
            if (field === 'search' && !item.name.toLowerCase().includes(value.toLowerCase()))
            {
                return false;
            }
            // if (field === 'categories')
            // {
            //     if (value.length == 0)
            //     {
            //         return true; // Skip the category check if no categories are selected.
            //     }
            //     if (!value.includes("Pizza"))
            //     {
            //         return false;
            //     }
            // }
            if (field === 'price' && Number(item.price) > value)
            {
                return false;
            }
            return true;
        });
    });
}

function filterAndRender()
{
    const criteria = [
        ['stars', mainStarsFilled],
        ['search', mainSearch.value],
        // ['categories', categoriesArray],
        ['price', price],
    ];

    Object.keys(menuItems).forEach(key =>
    {
        const section = allSections.querySelector(`#${key}`)
        const items = section.querySelector('.items')

        const filteredItems = filterMenuItems(menuItems[key], criteria);

        let tempString = ''
        filteredItems.forEach(item =>
        {
            tempString += `<menu-item name="${item.name}" price="${item.price}" img="${item.img}" stars="${item.stars}"
                            reviews='${JSON.stringify(item.reviews)}'
                            description="${item.description}"
                            masa="${item.masa}" uid="${item.uid}"></menu-item>`;
        })

        items.innerHTML = tempString;

        if (tempString == "")
        {
            section.style.display = 'none'
        }
        else
        {
            section.style.display = 'initial'
        }
    })

}

// Categories

categories.forEach(category =>
{
    category.addEventListener('click', (e) =>
    {
        e.target.classList.toggle('selected')
        updateMainCategories()
        filterAndRender()
    })
})

function updateMainCategories()
{
    categoriesArray = []
    categories.forEach(category =>
    {
        if (category.classList.contains('selected'))
        {
            categoriesArray.push(category.textContent.trim())
        }
    })
}

// Exit Popup

itemOverlay.addEventListener('click', () =>
{
    itemPopup.classList.remove('show');
    itemOverlay.classList.remove('show');
    unlockScroll();
    reviewSide.classList.remove('show')
    popupButton.classList.remove('shake')
    resetReviewSlide()
})

// Checkout Page

checkoutButton.addEventListener('click', () =>
{
    if (sideMenuIDs.length > 0)
    {
        window.location.href = '/pages/checkout.html'
    }
})

function updateMenuSidebar()
{
    let ordersString = '';
    let ordersPrice = 0;

    sideMenuIDs.forEach(itemId =>
    {
        const item = itemQuantityMap.get(itemId);

        ordersPrice += Number(`${item.getAttribute('price')}`) * Number(`${item.numValue}`);

        if (item && item.numValue > 0)
        {
            ordersString += `<side-menu-item name="${item.getAttribute('name')}" stars="${item.starScore}" price="${item.getAttribute('price')}" img="${item.getAttribute('img')}"
                        quantity="${item.numValue}" uid="${item.getAttribute('uid')}"></side-menu-item>`;
        }
    });
    if (ordersString == '')
    {
        ordersEmpty.classList.add('show')
        newPoint.classList.remove('show')
        checkoutButton.classList.remove("active")
        checkoutTotalSpan.classList.remove("active")
    }
    else
    {
        ordersEmpty.classList.remove('show')
        newPoint.classList.add('show')
        checkoutButton.classList.add("active")
        checkoutTotalSpan.classList.add("active")
    }
    ordersDiv.innerHTML = ordersString;
    ordersPriceDiv.innerText = ordersPrice;
}

function assignReviewNum(div, num)
{
    const pluralText = num === 1 ? 'recenzie' : 'recenzii';
    div.innerText = `${num} ${pluralText}`;
}

class MenuItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.numValue = 0;
        this.starScore = this.calculateStars();
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
      <style>
        *
      {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Roboto;
        user-select: none;
        z-index: 3;
      }
        :host {
            display: flex;
            width: 100%;
            flex-direction: column;
            cursor: pointer;
            height: 518px; 
            position: relative;
        }

        :host img {
            width: 100%;
            height: 300px;
            border-radius: 4px;
        }

        :host>.name {
            color: var(--day-dark01);
            font-size: 28px;
            font-weight: 700;
            margin-top: 8px;
            line-height: 42px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2
        }

        :host>.stars {
            white-space: nowrap;
            color: var(--day-gold);
            font-size: 24px;
            font-weight: 700;
            line-height: 42px;
            margin-top: -8px;
        }

        :host>.bottom
        {
            width: 100%;
            position: absolute;
            bottom: 0px;
            left: 0px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        :host>.bottom>.price,
        :host>.bottom>.price>span {
            color: var(--day-dark03);
            font-size: 24px;
            font-weight: 600;
            white-space: nowrap;
        }

        :host>.bottom>button {
            width: 100%;
            height: 40px;
            border-radius: 4px;
            background: var(--day-dark01);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: none;
            cursor: pointer;
            color: var(--day-white01);
            font-size: 16px;
            font-weight: 600;
            transition: opacity 0.1s linear;
        }
        :host>button:hover
        {
            opacity: 0.9;
        }
        :host>button:active
        {
            opacity: 1;
        }
        :host>button>svg
        {
            transform: rotate(0deg);
            transition: all 0.1s ease-in-out;
        }
        :host>button.shake>svg
        {
            transform: rotate(-15deg);
        }

        :host>button>span
        {
            display: none;
        }
      </style>

      <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}" draggable="false">
      <p class="name">${this.getAttribute('name')}</p>
      <p class="stars">
      ${assignStars(this.starScore)}
      </p>
      <div class="bottom">
        <p class="price"><span>${this.getAttribute('price')}</span> MDL</p>
        <button class="bttn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none">
                <path
                    d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                    stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span class="num"></span>
        </button>
      </div>
      
    `;
        const itemId = this.getAttribute('uid');
        itemQuantityMap.set(itemId, this);

        const button = this.shadowRoot.querySelector('.bttn');

        button.addEventListener('click', (e) =>
        {
            e.stopPropagation();
            this.addNumValue();
            if (!sideMenuIDs.includes(itemId))
            {
                sideMenuIDs.push(itemId)
            }
            e.target.classList.add('shake');

            updateMenuSidebar()
        });

        this.addEventListener('click', () =>
        {
            itemPopup.classList.add('show');
            itemOverlay.classList.add('show');
            lockScroll();

            popupImage.src = `${this.getAttribute('img')}`;

            popupName.innerText = `${this.getAttribute('name')}`
            popupPrice.innerText = `${this.getAttribute('price')} MDL`
            popupStars.innerText = `${assignStars(this.starScore)}`
            reviewStars.innerText = `${assignStars(this.starScore)}`
            popupDescription.innerText = `${this.getAttribute('description')}`
            popupMasa.innerText = `${this.getAttribute('masa')}`

            this.renderReviews()

            if (this.numValue > 0)
            {
                popupItemQuantity.style.display = 'initial'
                popupItemQuantity.innerText = `x ${this.numValue} `
                popupButton.classList.add('shake')
            }
            else
            {
                popupItemQuantity.style.display = 'none'
                popupButton.classList.remove('shake')
            }

            currentID = `${this.getAttribute('uid')}`

        });

    }

    addNumValue()
    {
        const numSpan = this.shadowRoot.querySelector('.num');
        this.numValue++;
        numSpan.textContent = `x ${this.numValue} `;
        numSpan.style.display = 'initial';

        popupButton.classList.add('shake')
        this.shadowRoot.querySelector('.bttn').classList.add('shake');
    };

    updateNumValue()
    {
        const numSpan = this.shadowRoot.querySelector('.num');
        if (this.numValue > 0)
        {
            numSpan.textContent = `x ${this.numValue} `;
            numSpan.style.display = 'initial';
        }
        else
        {
            numSpan.style.display = 'none';
            this.shadowRoot.querySelector('.bttn').classList.remove('shake');
        }

    }

    renderReviews()
    {
        const reviews = JSON.parse(this.getAttribute('reviews'));
        if (reviews.length > 0)
        {
            popupReviewsDiv.classList.remove('none');
            let tempReviewsString = ''
            reviews.forEach(review =>
            {
                tempReviewsString += `<item-review name="${review.name}" stars="${review.stars}"
                            description="${review.description}" date="${review.date}"
                            img="${review.img}"></item-review>`;
            })

            popupReviewsDiv.innerHTML = tempReviewsString;
        }
        else
        {
            popupReviewsDiv.innerHTML = `
            <div class="none-div">
                <svg xmlns="http://www.w3.org/2000/svg" width="97" height="96" viewBox="0 0 97 96" fill="none">
                    <path d="M36.5005 36L60.5005 60M60.5005 36L36.5005 60M84.5005 48C84.5005 67.8824 68.3829 84 48.5005 84C28.6182 84 12.5005 67.8824 12.5005 48C12.5005 28.1178 28.6182 12 48.5005 12C68.3829 12 84.5005 28.1178 84.5005 48Z" stroke="#0C0C0C" stroke-opacity="0.5" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Nu exista recenzii
            </div>`
            popupReviewsDiv.classList.add('none');
        }

        assignReviewNum(popupReviewsNum, reviews.length)
        assignReviewNum(reviewReviewsNum, reviews.length)
    }
    addReview(review)
    {
        const currentReviews = JSON.parse(this.getAttribute('reviews'));
        currentReviews.push(review)
        this.setAttribute('reviews', JSON.stringify(currentReviews));
        this.renderReviews();

        // Salvare in main
        for (const sectionName in menuItems)
        {
            const section = menuItems[sectionName];
            if (section)
            {
                const foundItem = section.find(item => item.uid === currentID);

                if (foundItem)
                {
                    // Item found, you can access it as foundItem
                    foundItem.reviews.push(review)
                    break; // Exit the loop since you found the item
                }
            }
        }

        const reviewTextarea = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>textarea')
        deleteTextAnim(reviewTextarea)
        this.starScore = this.calculateStars();

        this.updateStars();

        // Sa se updateze stelele daca pui 0 si schimbi la 3 sa se schimbe si la meniu
        updateMenuSidebar()
    }
    calculateStars()
    {
        const reviews = JSON.parse(this.getAttribute('reviews'));
        let totalStars = 0;

        reviews.forEach(review =>
        {
            totalStars += Number(review.stars);
        });

        return Math.round(totalStars / reviews.length);
    }
    updateStars()
    {
        popupStars.innerText = `${assignStars(this.starScore)}`
        reviewStars.innerText = `${assignStars(this.starScore)}`
        this.shadowRoot.querySelector(':host>.stars').innerText = `${assignStars(this.starScore)}`
    }

}

window.customElements.define("menu-item", MenuItem)

popupButton.addEventListener('click', () =>
{
    const currentItem = itemQuantityMap.get(currentID);
    currentItem.addNumValue();
    if (currentItem.numValue > 0)
    {
        popupItemQuantity.style.display = 'initial'
        popupItemQuantity.textContent = `x ${currentItem.numValue} `
    }
    else
    {
        popupItemQuantity.style.display = 'none'
    }

    if (!sideMenuIDs.includes(currentItem.getAttribute('uid')))
    {
        sideMenuIDs.push(currentItem.getAttribute('uid'))
    }
    updateMenuSidebar()
})

class SideMenuItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
    <style>
        *
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Poppins, Roboto;
            user-select: none;
            z-index: 3;
        }
        :host {
            display: grid;
            grid-template-columns: 80px 1fr;
            width: 100%;
            column-gap: 16px;
            position: relative;
            height: 80px;
        }

        :host>.img {
            width: 100%;
            height: 80px;
            position: relative;
        }

        :host>.img>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }

        :host>.img>.quantity {
            position: absolute;
            top: -8px;
            right: -7px;
            border-radius: 100px;
            background: var(--day-dark02);
            width: 24px;
            height: 24px;
            color: var(--day-white01);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
        }

        :host>.text {
            display: flex;
            flex-direction: column;
            width: 100 %;
        }

        :host>.text>.name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--day-dark01);
            font-size: 20px;
            font-weight: 700;
            white-space: nowrap;
        }

        :host>.text>.name>.delete {
            background: none;
            width: 16px;
            height: 16px;
            border: none;
            cursor: pointer;
        }
        :host>.text>.name>.delete>svg
        {
            transition: all 0.15s ease-in-out;
        }
        :host>.text>.name>.delete:hover>svg
        {
            transform: scale(0.85);
        }

        :host>.text>.stars {
            display: flex;
            align-items: center;
            height: 22px;
            color: var(--day-gold);
            font-size: 21px;
            font-weight: 700;
            white-space: nowrap;
        }

        :host>.text>.price {
            color: var(--day-dark03);
            font-size: 20px;
            font-weight: 600;
            margin-top: 2px;
            white-space: nowrap;
        }
        
      </style>

        <div class="img">
            <div class="quantity">${this.getAttribute('quantity')}</div>
            <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}" draggable="false">
        </div>
        <div class="text">
            <div class="name">
                <span>${this.getAttribute('name')}</span>

                <button class="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                        fill="none">
                        <g clip-path="url(#clip0_41_1430)">
                            <path
                                d="M9.87523 7.93264L15.4608 13.547C15.968 14.0558 15.968 14.883 15.4608 15.3918C14.9536 15.9022 14.1312 15.9022 13.624 15.3918L8.03843 9.77904L2.39683 15.4494C1.88483 15.9646 1.05603 15.9646 0.544034 15.4494C0.0320342 14.9358 0.0320342 14.1006 0.544034 13.587L6.18563 7.91504L0.771234 2.47344C0.264034 1.96304 0.264034 1.13744 0.771234 0.627039C1.27843 0.116639 2.10083 0.116639 2.60643 0.627039L8.02083 6.07024L13.5136 0.550239C14.0256 0.0366391 14.8544 0.0366391 15.3664 0.550239C15.8784 1.06544 15.8784 1.89904 15.3664 2.41264L9.87523 7.93264Z"
                                fill="#0C0C0C" />
                        </g>
                        <defs>
                            <clipPath id="clip0_41_1430">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>

            </div>
            <span class="stars">
                ${assignStars(this.getAttribute('stars'))}
            </span>
            <span class="price">${this.getAttribute('price')} MDL</span>
        </div>


`;

        const deleteBttn = this.shadowRoot.querySelector(".delete")
        const ID = this.getAttribute('uid')

        deleteBttn.addEventListener('click', () =>
        {
            const item = itemQuantityMap.get(ID);
            item.numValue = item.numValue - 1
            if (item.numValue <= 0)
            {
                sideMenuIDs = sideMenuIDs.filter(id => id !== ID)
            }

            item.updateNumValue()

            updateMenuSidebar()
        })


    }
}

window.customElements.define("side-menu-item", SideMenuItem)

const reviewTextarea = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>textarea')
const reviewWordsSpan = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>.max>span')

const createReviewStars = document.querySelectorAll(".item-popup>.reviews-side>.content>.create-review>.front>.stars>svg")
const createReviewForm = document.querySelector('.item-popup>.reviews-side>.content>.create-review')

const createReviewBttn = document.querySelector(".item-popup>.reviews-side>.content>.header>button")
const xSVG = document.querySelector('.item-popup>.reviews-side>.content>.header>button>svg')

const reviewsDiv = document.querySelector(".item-popup>.reviews-side>.content>.reviews")
const createReviewDiv = document.querySelector('.item-popup>.reviews-side>.content>.create-review')
const createStarsDiv = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.front>.stars')

let pastTextareaValue = '';
let createReviewStarsFilled = 0;
let starsAreSelected = false;

reviewTextarea.addEventListener('input', (e) =>
{
    if (e.target.value.length <= 500)
    {
        reviewWordsSpan.innerText = `${e.target.value.length}`;
        pastTextareaValue = e.target.value
    }
    else
    {
        e.target.value = pastTextareaValue;
    }
})

createReviewStars.forEach(star =>
{
    star.addEventListener('click', (e) =>
    {
        starsAreSelected = true;
        createReviewStarsFilled = starsAnim(createReviewStars, e.target, ".item-popup>.reviews-side>.content>.create-review>.front>.stars>svg>.fill")
    })
})

createReviewForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

    if (starsAreSelected && reviewTextarea.value !== '')
    {
        const currentItem = itemQuantityMap.get(currentID);
        const uid = generateMongoLikeID();
        const date = formatDate(new Date());

        currentItem.addReview({
            name: "Andrei Arseni",
            date: date,
            stars: `${createReviewStarsFilled}`,
            description: `${reviewTextarea.value}`,
            img: "../assets/Account/pizza.png",
            uid: uid
        })
        resetReviewSlide()
    }
    if (!starsAreSelected)
    {
        createStarsDiv.classList.add('anim')
        setTimeout(() =>
        {
            createStarsDiv.classList.remove('anim')
        }, 350)
    }
    if (reviewTextarea.value == '')
    {
        reviewTextarea.classList.add('anim')
        setTimeout(() =>
        {
            reviewTextarea.classList.remove('anim')
        }, 350)
    }

})

function resetReviewSlide()
{
    reviewWordsSpan.innerText = "0";

    createReviewBttn.classList.remove('active')
    reviewsDiv.classList.add('active');
    createReviewDiv.classList.remove('active');
    xSVG.classList.remove('active')

    createReviewStars.forEach(star =>
    {
        star.querySelector('path.fill').classList.add('not')
    })
    starsAreSelected = false;
    createReviewStarsFilled = 0;
}