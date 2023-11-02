import { lockScroll, unlockScroll, assignStars } from "../utils.js";

const itemQuantityMap = new Map();
let currentID = '';

const itemOverlay = document.querySelector('#item-overlay');
const itemPopup = document.querySelector(".item-popup");

const popupImage = document.querySelector('.item-popup>.image>img')
const popupName = document.querySelector('.item-popup>.text>.header>.name')
const popupPrice = document.querySelector('.item-popup>.text>.header>.price>span')
const popupStars = document.querySelector('.item-popup>.text>.reviews>.stars')
const popupStarsNum = document.querySelector('.item-popup>.text>.reviews>.num>.star-num')
const popupReviewsNum = document.querySelector('.item-popup>.text>.reviews>.num>.reviews-num')
const popupDescription = document.querySelector('.item-popup>.text>.description')
const popupMasa = document.querySelector('.item-popup>.text>.end>.masa>span')
const popupItemQuantity = document.querySelector('.item-popup>.text>.end>button>span')
const popupButton = document.querySelector('.item-popup>.text>.end>button')

const reviewSide = document.querySelector('.reviews-side')
const reviewStars = document.querySelector('.item-popup>.reviews-side>.content>.header>.reviews-stats>.stars-div>.stars')
const reviewRatings = document.querySelector('.item-popup>.reviews-side>.content>.header>.reviews-stats>.stars-div>.rating')
const reviewReviewsNum = document.querySelector('.item-popup>.reviews-side>.content>.header>.reviews-stats>.stars-div>.reviews-num')

const newPoint = document.querySelector(".menu-bttn>.wrap>.new")
const ordersDiv = document.querySelector(".menu-side>.wrap>.orders")
const ordersPriceDiv = document.querySelector('.menu-side>.wrap>.checkout>span>.price')

itemOverlay.addEventListener('click', () =>
{
    itemPopup.classList.remove('show');
    itemOverlay.classList.remove('show');
    unlockScroll();
    reviewSide.classList.remove('show')

})

let sideMenuIDs = [];

function updateMenuSidebar()
{
    let ordersString = '';
    let ordersPrice = 0;

    sideMenuIDs.forEach(itemId =>
    {
        const item = itemQuantityMap.get(itemId);

        ordersPrice += Number(`${item.getAttribute('price')}`);

        if (item && item.numValue > 0)
        {
            ordersString += `<side-menu-item name="${item.getAttribute('name')}" stars="${item.getAttribute('stars')}" price="${item.getAttribute('price')}" img="${item.getAttribute('img')}"
                        quantity="${item.numValue}"></side-menu-item>`;
        }
    });

    ordersDiv.innerHTML = ordersString;
    ordersPriceDiv.innerText = ordersPrice;

}

class MenuItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.numValue = 0;
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
        }

        :host>.stars {
            white-space: nowrap;
            color: var(--day-gold);
            font-size: 24px;
            font-weight: 700;
            line-height: 42px;
            margin-top: -8px;
        }

        :host>.price,
        :host>.price>span {
            color: var(--day-dark03);
            font-size: 24px;
            font-weight: 600;
            white-space: nowrap;
        }

        :host>button {
            width: 100%;
            height: 40px;
            border-radius: 4px;
            margin-top: 12px;
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
        }
        :host>button>span
        {
            display: none;
        }
      </style>

      <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}">
      <p class="name">${this.getAttribute('name')}</p>
      <p class="stars">
      ${assignStars(this.getAttribute('stars'))}
      </p>
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
    `;

        // Get the span element and the button element
        const itemId = this.getAttribute('uid');
        itemQuantityMap.set(itemId, this);

        const button = this.shadowRoot.querySelector('.bttn');

        // Add a click event listener to the button
        button.addEventListener('click', (e) =>
        {
            e.stopPropagation();
            this.updateNumValue();
            newPoint.classList.add('show')
            if (!sideMenuIDs.includes(itemId))
            {
                sideMenuIDs.push(itemId)
            }

            updateMenuSidebar()
        });

        this.addEventListener('click', () =>
        {
            itemPopup.classList.add('show');
            itemOverlay.classList.add('show');
            lockScroll();

            popupImage.src = `${this.getAttribute('img')}`;


            popupName.innerText = `${this.getAttribute('name')}`
            popupPrice.innerText = `${this.getAttribute('price')}`
            popupStars.innerText = `${assignStars(this.getAttribute('stars'))}`
            popupStarsNum.innerText = `${this.getAttribute('stars')}`
            popupReviewsNum.innerText = `${this.getAttribute('reviews')}`
            popupDescription.innerText = `${this.getAttribute('description')}`
            popupMasa.innerText = `${this.getAttribute('masa')}`
            reviewStars.innerText = `${assignStars(this.getAttribute('stars'))}`
            reviewRatings.innerText = `${this.getAttribute('stars')}`
            reviewReviewsNum.innerText = `(${this.getAttribute('reviews')})`

            if (this.numValue > 0)
            {
                popupItemQuantity.style.display = 'initial'
                popupItemQuantity.innerText = `x ${this.numValue}`
            }
            else
            {
                popupItemQuantity.style.display = 'none'
            }

            currentID = `${this.getAttribute('uid')}`

        });

    }

    updateNumValue()
    {

        this.numValue++;
        const numSpan = this.shadowRoot.querySelector('.num');

        numSpan.textContent = `x ${this.numValue}`;
        numSpan.style.display = 'initial';

    };

}

window.customElements.define("menu-item", MenuItem)

popupButton.addEventListener('click', () =>
{
    const currentItem = itemQuantityMap.get(currentID);
    currentItem.updateNumValue();
    popupItemQuantity.style.display = 'initial'
    popupItemQuantity.textContent = `x ${currentItem.numValue}`
    newPoint.classList.add('show')
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
            margin : 0;
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
            width: 100%;
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
            <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}">
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

    }
}

window.customElements.define("side-menu-item", SideMenuItem)