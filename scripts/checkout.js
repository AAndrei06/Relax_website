let ordersString = localStorage.getItem('orders');
let orders = JSON.parse(ordersString);

const ordersDiv = document.querySelector(".all>.orders-div>.content>.wrap>.orders");
const allOrdersSection = document.querySelector('.orders-div>.content');
const ordersContent = document.querySelector('.all>.orders-div>.content>.wrap')
const totalPriceDiv = document.querySelector(".all>.orders-div>.content>.wrap>.total>.total-price");
const loadingAnim = document.querySelector(".all>.orders-div>.content>.loading")
const subTotal = document.querySelector("#subtotal");
const continueButton = document.querySelector('#continue-button')

// Email JS changes


let stringListOrders = "";


// End Email JS changes

firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        productsDB.get().then((querySnapshot) =>
        {
            let keysArray = []

            for (let key in orders)
            {
                if (orders.hasOwnProperty(key))
                {
                    keysArray.push(key)
                }
            }

            let totalPrice = 0

            querySnapshot.forEach(product =>
            {
                if (keysArray.includes(product.id))
                {
                    ordersDiv.innerHTML += `<checkout-order name="${product.data().name}" price="${product.data().price}" img="${product.data().photoURL}"
                        quantity="${orders[product.id]}"></checkout-order>`;
                    totalPrice += product.data().price * orders[product.id];
                    stringListOrders = stringListOrders + " x" + orders[product.id]+" " + product.data().name + "  " + product.data().price+"lei/item \n";
                }
            })
            stringListOrders = stringListOrders + "Livrare ---------------- 35 lei \nTotal ------------------ "+Number(totalPrice+35)+" lei";
            totalPriceDiv.innerText = `${totalPrice + 35}.00 MDL`;
            subTotal.innerText = `${totalPrice}.00 MDL`;
            ordersContent.style.display = 'flex';
            loadingAnim.style.display = 'none'
            continueButton.classList.remove('disabled');
        }).then(() => {
            console.log(stringListOrders);
        })
    }
});

const adressInput = document.querySelector("#adress-input");
const apartamentInput = document.querySelector("#apartament-input");
const phoneInput = document.querySelector("#phone-input");
const checkoutForm = document.querySelector(".all>.information")


checkoutForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

    // Email Js

    const serviceID = "service_30goqf3";
    const templateID = "template_ovvp6se";

    function sendEmail(){
        let params = {
            name:adressInput.value,
            apartament:apartamentInput.value,
            tel:phoneInput.value,
            message:stringListOrders
        };

        emailjs.send(serviceID,templateID,params).then((res) => {
            adressInput.value = "";
            apartamentInput.value = "",
            phoneInput.value = "",
            console.log("success");
        }).then(() => {
            let btnSubmit = document.getElementById("continue-button");
            btnSubmit.style.backgroundColor = "#799f82";
            btnSubmit.innerHTML = "Succes";
            setTimeout(() => {
                btnSubmit.style.backgroundColor = "black";
                btnSubmit.innerHTML = "Continuă";
            },2000);
        })

    }
    sendEmail();

    // Email JS END

})

const infoButton = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>button');
const infoPopup = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>.popup');

infoButton.addEventListener('click', (e) =>
{
    e.stopPropagation();
    infoPopup.classList.toggle('show')
})

document.addEventListener('click', (event) =>
{
    if (!infoPopup.contains(event.target))
    {
        infoPopup.classList.remove('show');
    }
});
