const nameProduct = document.getElementById("admin-item-name");
const photoProduct = document.getElementById("admin-item-photo");
const priceProduct = document.getElementById("admin-item-price");
const categoryProduct = document.getElementById("admin-item-category");
const descriptionProduct = document.getElementById("admin-item-description");
const submitProduct = document.getElementById("extra-action");

const pizzaItems = document.getElementById("pizza-section").querySelector(".items")
const gustariItems = document.getElementById("gustari-section").querySelector(".items");
const garnituriItems = document.getElementById("garnituri-section").querySelector(".items");
const ciorbeItems = document.getElementById("ciorbe-section").querySelector(".items");
const micDejunItems = document.getElementById("micdejun-section").querySelector(".items");
const sushiItems = document.getElementById("sushi-section").querySelector(".items");
const pesteItems = document.getElementById("peste-section").querySelector(".items");
const salateItems = document.getElementById("salate-section").querySelector(".items");
const bereItems = document.getElementById("bere-section").querySelector(".items");
const carneItems = document.getElementById("carne-section").querySelector(".items");


productsDB.onSnapshot((snapshot) => {
    let products = snapshot.docs;

    for (let i = 0;i < products.length;i++){
        if (products[i].data().category == "pizza-section"){
            pizzaItems += `
            
            `;
        }
    }
});

submitProduct.addEventListener("click",() => {

    if (photoProduct.files[0] != null && nameProduct.value != "" && priceProduct.value != "" && descriptionProduct.value != ""){
        productsDB.add({
            stars:5,
            name:nameProduct.value,
            description:descriptionProduct.value,
            category:categoryProduct.value,
            price:priceProduct.value,
            photoURL:"",
        }).then((object) => {
            let file = photoProduct.files[0];
            firebase.storage().ref().child('/' + object.id + ".png").put(file).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((urlfile) => {
                    downloadURLFile = urlfile;
                    productsDB.doc(object.id).update({
                        photoURL: downloadURLFile,
                    })
                })
            });
        });
    }else{
        window.alert("Umpleți toate casetele");
    }
});