const nameProduct = document.getElementById("admin-item-name");
const photoProduct = document.getElementById("admin-item-photo");
const priceProduct = document.getElementById("admin-item-price");
const categoryProduct = document.getElementById("admin-item-category");
const descriptionProduct = document.getElementById("admin-item-description");
const submitProduct = document.getElementById("extra-action");

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