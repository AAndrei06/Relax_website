import { lockScroll, unlockScroll } from "../utils.js";

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

itemOverlay.addEventListener('click', () =>
{
    itemPopup.classList.remove('show');
    itemOverlay.classList.remove('show');
    unlockScroll();
})

function assignStars(starsNum)
{
    starsNum = Math.min(Math.max(starsNum, 0), 5);

    const starsString = '★ '.repeat(starsNum) + '☆ '.repeat(5 - starsNum);

    return starsString;
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

      <img src="${this.getAttribute('img')}" alt="">
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

})