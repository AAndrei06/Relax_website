function deleteOrder(id) {
    if (confirm("Ești sigur(ă) că vrei să ștergi această comandă?")) {
        ordersDB.doc(id).delete().then(() => {
            alert("Comanda a fost ștearsă!!!");
        })
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        let uid = user.uid;
        let is_admin = false;
        usersDB.where("ID", "==", user.uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().admin) {
                        is_admin = true;
                    }
                });
            }).then(() => {
                if (!is_admin) {
                    window.location.pathname = "/";
                } else {
                    let main = document.getElementsByClassName('main-cnt')[0];

                    ordersDB.onSnapshot((snapshot) => {
                        let docs = snapshot.docs;
                        main.innerHTML = '';
                        try {
                            let audio = new Audio("../assets/ding.mp3");
                            audio.play();
                        } catch (error) {
                            console.log(error);
                        }
                        let total = 0;
                        for (let i = 0; i < docs.length; i++) {
                            if (docs[i].data().products != null) {

                                let date = new Date(Number(docs[i].data().date));
                                let products = JSON.parse(docs[i].data().products);
                                let total = 0;
                                async function getAll(entries) {
                                    let content = "";
                                    for (const [key, value] of entries) {
                                        try {
                                            let l = await productsDB.doc(key).get().then((doc) => {
                                                content += `<li>${doc.data().name} ---- ${doc.data().price} lei x${value}</li>`;
                                                total += doc.data().price * value;
                                            })
                                        } catch (err) {
                                            content = "<li><b>Un produs comandat nu mai este în meniu</b></li>";
                                        }
                                    }


                                    main.innerHTML += `
                                    <div class="order-box">
                                        <div class="flex-cont">
                                            <h2 class="order-date">${formatDate(docs[i].data().date)}, ${date.getHours()}:${date.getMinutes()}</h2>
                                            <button value = "${docs[i].id}" onclick = "deleteOrder('${docs[i].id}')">Șterge Comanda</button>
                                        </div>
                                        <p class="owner">
                                        <h4>De la:</h4> <span class="owner-name">${docs[i].data().name}</span></p>
                                        <h3 class="products-order">Produse:</h3>
                                        <div class="orders">
                                        <ul>
                                            ${content}
                                            </ul>
                                        </div>
                                        <br>
                                        <div class="detalii">
                                            <p><span class="text2">Apartament: </span>${docs[i].data().apartment}</p>
                                            <p><span class="text2">Telefon: </span>${docs[i].data().number}</p>
                                            <p><span class="text2">Adresa: </span>${docs[i].data().addr}</p>
                                        </div>
                                        <br>
                                        <div class="total">
                                            <h5>Subtotal: <span>${total}</span> lei</h5>
                                            <h5>Livrare: <span>${35}</span> lei</h5>
                                            <h3>Total: <span>${total + 35}</span> lei</h3>
                                        </div>
                                    </div>
                                    `
                                }
                                getAll(Object.entries(JSON.parse(docs[i].data().products)));


                            }
                        }
                    })


                }
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });

    } else {
        window.location.pathname = "/";
    }
});