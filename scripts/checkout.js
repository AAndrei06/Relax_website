let ordersString = localStorage.getItem('orders');
let orders = JSON.parse(ordersString);

const ordersDiv = document.querySelector("main>.orders-div>.content>.orders");
const allOrdersSection = document.querySelector('.orders-div>.content');
const totalPriceDiv = document.querySelector("main>.orders-div>.content>.total>.total-price");
const subTotal = document.querySelector("#subtotal");
const continueButton = document.querySelector('#continue-button')

firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        // usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        // {
        //     querySnapshot.forEach((doc) =>
        //     {
        //         console.log(doc.data().name)
        //     });
        // })
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
                    console.log('includes: ' + product.id);
                    totalPrice += product.data().price * orders[product.id];
                }
            })
            totalPriceDiv.innerText = `${totalPrice + 35}.00 MDL`;
            subTotal.innerText = `${totalPrice}.00 MDL`;
            allOrdersSection.style.display = 'flex';
            continueButton.classList.remove('disabled');
        })
    }
});

const adressInput = document.querySelector("#adress-input");
const apartamentInput = document.querySelector("#apartament-input");
const phoneInput = document.querySelector("#phone-input");
const checkoutForm = document.querySelector("main>.information")


checkoutForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

})

const infoButton = document.querySelector('main>.information>.method>.inputs>.input>.info>.content>button');
const infoPopup = document.querySelector('main>.information>.method>.inputs>.input>.info>.content>.popup');

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

