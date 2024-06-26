let ordersString = localStorage.getItem('orders');
let orders = JSON.parse(ordersString);
console.log(window.location)
const ordersDiv = document.querySelector(".all>.orders-div>.content>.wrap>.orders");
const allOrdersSection = document.querySelector('.orders-div>.content');
const ordersContent = document.querySelector('.all>.orders-div>.content>.wrap')
const totalPriceDiv = document.querySelector(".all>.orders-div>.content>.wrap>.total>.total-price");
const loadingAnim = document.querySelector(".all>.orders-div>.content>.loading")
const subTotal = document.querySelector("#subtotal");
const continueButton = document.querySelector('#continue-button')

let name = document.getElementsByName("name-order")[0];
let addr = document.getElementsByName("adress-order")[0];
let apartament = document.getElementsByName("apartament-order")[0];
let number = document.getElementsByName("number-order")[0];


document.getElementById("backtocart").onclick = () => {
    window.location.pathname = "/pages/menu.html"
}

productsDB.get().then((querySnapshot) => {
    let keysArray = []

    for (let key in orders) {
        if (orders.hasOwnProperty(key)) {
            keysArray.push(key)
        }
    }

    let totalPrice = 0

    querySnapshot.forEach(product => {
        if (keysArray.includes(product.id)) {
            ordersDiv.innerHTML += `<checkout-order name="${product.data().name}" price="${product.data().price}" img="${product.data().photoURL}"
                        quantity="${orders[product.id]}"></checkout-order>`;
            totalPrice += product.data().price * orders[product.id];
        }
    })
    totalPriceDiv.innerText = `${totalPrice + 35}.00 MDL`;
    subTotal.innerText = `${totalPrice}.00 MDL`;
    ordersContent.style.display = 'flex';
    loadingAnim.style.display = 'none'
    continueButton.classList.remove('disabled');
})

const adressInput = document.querySelector("#adress-input");
const apartamentInput = document.querySelector("#apartament-input");
const phoneInput = document.querySelector("#phone-input");
const checkoutForm = document.querySelector(".all>.information")

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let date = new Date();
    if (localStorage.getItem('orders') != null && localStorage.getItem('orders').length != 0) {
        ordersDB.add({
            "name": name.value,
            "addr": addr.value,
            "apartment": apartament.value,
            "number": number.value,
            "date": date.getTime(),
            "products": localStorage.getItem("orders")
        }).then(() => {
            localStorage.removeItem("orders");
            continueButton.style.backgroundColor = "#799f82";
            continueButton.innerHTML = "Trimis";
            setTimeout(() => {
                continueButton.style.backgroundColor = "black";
                continueButton.innerHTML = "Continuă";
                window.location.href = "/pages/menu.html";
            }, 2000)
        }).catch((err) => {
            console.log(err);
            continueButton.style.backgroundColor = "#ef5b5b";
            continueButton.innerHTML = "Eroare";
            setTimeout(() => {
                continueButton.style.backgroundColor = "black";
                continueButton.innerHTML = "Continuă";
            }, 2000);
        });
    } else {
        continueButton.style.backgroundColor = "#ef5b5b";
        continueButton.innerHTML = "Eroare";
        setTimeout(() => {
            continueButton.style.backgroundColor = "black";
            continueButton.innerHTML = "Continuă";
        }, 2000);
    }


})

const infoButton = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>button');
const infoPopup = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>.popup');

infoButton.addEventListener('click', (e) => {
    e.stopPropagation();
    infoPopup.classList.toggle('show')
})

document.addEventListener('click', (event) => {
    if (!infoPopup.contains(event.target)) {
        infoPopup.classList.remove('show');
    }
});

