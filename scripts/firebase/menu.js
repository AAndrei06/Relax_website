let loggedUser = null;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loggedUser = user;

        const nameProduct = document.getElementById("admin-item-name");
        const photoProduct = document.getElementById("admin-item-photo");
        const priceProduct = document.getElementById("admin-item-price");
        const categoryProduct = document.getElementById("admin-item-category");
        const descriptionProduct = document.getElementById("admin-item-description");
        const submitProduct = document.getElementById("extra-action");

        let pizzaItems = document.getElementById("pizza-section").querySelector(".items")
        let gustariItems = document.getElementById("gustari-section").querySelector(".items");
        let garnituriItems = document.getElementById("garnituri-section").querySelector(".items");
        let ciorbeItems = document.getElementById("ciorbe-section").querySelector(".items");
        let micDejunItems = document.getElementById("micdejun-section").querySelector(".items");
        let sushiItems = document.getElementById("sushi-section").querySelector(".items");
        let pesteItems = document.getElementById("peste-section").querySelector(".items");
        let salateItems = document.getElementById("salate-section").querySelector(".items");
        let bereItems = document.getElementById("bere-section").querySelector(".items");
        let carneItems = document.getElementById("carne-section").querySelector(".items");
        let allItemsBoxes = document.querySelectorAll(".items");
        let searchField = document.getElementById("text-search-field-products");
        let slider = document.querySelector(".slider-price-input");
        let starsContainer = document.querySelector(".stars-container-svg");
        let orders = document.querySelector(".orders");
        let toggleEmpty = document.querySelector(".empty");
        let checkOut = document.querySelector(".checkout").querySelector("#price-of-checkout");
        let productItemsData = [];

        let selectedCategories = ["pizza-section", "gustari-section", "garnituri-section",
            "ciorbe-section", "micdejun-section", "sushi-section",
            "peste-section", "salate-section", "bere-section", "carne-section"];

        let starsCount = 5;

        cartsDB.where("ID", "==", loggedUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((object) => {
                let productsAll = object.data().products;
                let hashMap = {};
                for (let i = 0; i < productsAll.length; i++) {
                    if (hashMap.hasOwnProperty(productsAll[i])) {
                        hashMap[productsAll[i]] += 1;
                    } else {
                        hashMap[productsAll[i]] = 1;
                    }
                    let cartProduct = productsDB.doc(productsAll[i]);

                }
                if (hashMap.length == 0){
                    toggleEmpty.classList.add("show");
                }
                let totalPrice = 0;
                for (const [key, value] of Object.entries(hashMap)) {
                    console.log(productsDB.doc(key).get().then((doc) => {
                        let stars = "";
                        for (let i = 0; i < doc.data().stars; i++) {
                            stars += " ★";
                        }
                        totalPrice += doc.data().price;
                        checkOut.innerHTML = totalPrice;
                        orders.innerHTML += `
                        <div class="side-menu-item">
                            <div class="img">
                                <div class="quantity">${value}</div>
                                <img src="${doc.data().photoURL}" alt="Imagine cu Nume" draggable="false">
                            </div>
                            <div class="text">
                                <div class="name">
                                    <span>${doc.data().name}</span>
                                    <button value = "${doc.id}" class="delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                            fill="none">
                                            <g clip-path="url(#clip0_41_1430)">

                                                <path
                                                    d="M9.87523 7.93264L15.4608 13.547C15.968 14.0558 15.968 14.883 15.4608 15.3918C14.9536 15.9022 14.1312 15.9022 13.624 15.3918L8.03843 9.77904L2.39683 15.4494C1.88483 15.9646 1.05603 15.9646 0.544034 15.4494C0.0320342 14.9358 0.0320342 14.1006 0.544034 13.587L6.18563 7.91504L0.771234 2.47344C0.264034 1.96304 0.264034 1.13744 0.771234 0.627039C1.27843 0.116639 2.10083 0.116639 2.60643 0.627039L8.02083 6.07024L13.5136 0.550239C14.0256 0.0366391 14.8544 0.0366391 15.3664 0.550239C15.8784 1.06544 15.8784 1.89904 15.3664 2.41264L9.87523 7.93264Z"
                                                    fill="var(--day-dark01)" />

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
                                    ${stars}
                                </span>
                                <span class="price">${doc.data().price} MDL</span>

                            </div>
                        </div>
                        `;
                    }));
                }


            })
        })

        function displayFiltered(nrOfStars, priceAmount, categories, searchResult) {
            for (let i = 0; i < allItemsBoxes.length; i++) {
                allItemsBoxes[i].innerHTML = "";
            }
            productItemsData.forEach((product) => {
                if (product.data().stars == nrOfStars
                    && product.data().price <= priceAmount
                    && categories.includes(product.data().category)
                    && product.data().name.toLowerCase().includes(searchResult.toLowerCase())) {
                    let stars = "";
                    for (let i = 0; i < product.data().stars; i++) {
                        stars += " ★";
                    }
                    let component = `
            <div class="menu-item">
                <img src="${product.data().photoURL}" alt="Imagine cu TEST" draggable="false"
                    loading="lazy">
                <p class="name">${product.data().name}</p>
                <p class="stars">
                    ${stars}
                </p>
                <div class="bottom">
                    <p class="price"><span>${product.data().price}</span> MDL</p>
                    <button class="bttn" id = "btn-add-cart" value = "${product.id}" aria-label="Adaugă în coș">
                        <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">

                            <path
                                d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                                stroke="var(--day-white01)" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />

                        </svg>
                        <span class="num"></span>
                    </button>
                </div>
            </div>`;

                    if (product.data().category == "pizza-section") {
                        pizzaItems.innerHTML += component;
                    }
                    else if (product.data().category == "gustari-section") {
                        gustariItems.innerHTML += component;
                    }
                    else if (product.data().category == "garnituri-section") {
                        garnituriItems.innerHTML += component;
                    }
                    else if (product.data().category == "ciorbe-section") {
                        ciorbeItems.innerHTML += component;
                    }
                    else if (product.data().category == "micdejun-section") {
                        micDejunItems.innerHTML += component;
                    }
                    else if (product.data().category == "sushi-section") {
                        sushiItems.innerHTML += component;
                    }
                    else if (product.data().category == "peste-section") {
                        pesteItems.innerHTML += component;
                    }
                    else if (product.data().category == "salate-section") {
                        salateItems.innerHTML += component;
                    }
                    else if (product.data().category == "bere-section") {
                        bereItems.innerHTML += component;
                    }
                    else if (product.data().category == "carne-section") {
                        carneItems.innerHTML += component;
                    }

                    let allCartButtons = document.querySelectorAll("#btn-add-cart");
                    console.log("Result");
                    allCartButtons.forEach((button) => {
                        button.addEventListener("click", () => {
                            if (loggedUser != null) {
                                cartsDB.where("ID", "==", loggedUser.uid).get().then((querySnapshot) => {
                                    querySnapshot.forEach((object) => {
                                        let productsAll = object.data().products;
                                        productsAll.push(button.value);
                                        cartsDB.doc(object.id).update({
                                            products: productsAll,
                                        }).then(() => {
                                            console.log(button.value);
                                        });
                                    })
                                })
                            } else {
                                window.location = "inregistrare.html";
                            }
                        })
                    })
                }
            });
        }



        productsDB.get().then((querySnapshot) => {
            querySnapshot.forEach((product) => {
                productItemsData.push(product);
            })
        }).then(() => {
            productItemsData.forEach((product) => {
                let stars = "";
                for (let i = 0; i < product.data().stars; i++) {
                    stars += " ★";
                }
                let component = `
        <div class="menu-item">
            <img src="${product.data().photoURL}" alt="Imagine cu TEST" draggable="false"
                loading="lazy">
            <p class="name">${product.data().name}</p>
            <p class="stars">
                ${stars}
            </p>
            <div class="bottom">
                <p class="price"><span>${product.data().price}</span> MDL</p>
                <button class="bttn" id = "btn-add-cart" value = "${product.id}" aria-label="Adaugă în coș">
                    <svg xmlns="http:www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none">

                        <path
                            d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                            stroke="var(--day-white01)" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />

                    </svg>
                    <span class="num"></span>
                </button>
            </div>
        </div>`;

                if (product.data().category == "pizza-section") {
                    pizzaItems.innerHTML += component;
                }
                else if (product.data().category == "gustari-section") {
                    gustariItems.innerHTML += component;
                }
                else if (product.data().category == "garnituri-section") {
                    garnituriItems.innerHTML += component;
                }
                else if (product.data().category == "ciorbe-section") {
                    ciorbeItems.innerHTML += component;
                }
                else if (product.data().category == "micdejun-section") {
                    micDejunItems.innerHTML += component;
                }
                else if (product.data().category == "sushi-section") {
                    sushiItems.innerHTML += component;
                }
                else if (product.data().category == "peste-section") {
                    pesteItems.innerHTML += component;
                }
                else if (product.data().category == "salate-section") {
                    salateItems.innerHTML += component;
                }
                else if (product.data().category == "bere-section") {
                    bereItems.innerHTML += component;
                }
                else if (product.data().category == "carne-section") {
                    carneItems.innerHTML += component;
                }

                let allCartButtons = document.querySelectorAll("#btn-add-cart");
                console.log("Result");
                allCartButtons.forEach((button) => {
                    button.addEventListener("click", () => {
                        if (loggedUser != null) {
                            cartsDB.where("ID", "==", loggedUser.uid).get().then((querySnapshot) => {
                                querySnapshot.forEach((object) => {
                                    let productsAll = object.data().products;

                                    productsAll.push(button.value);
                                    cartsDB.doc(object.id).update({
                                        products: productsAll,
                                    }).then(() => {
                                        console.log(button.value);
                                    });
                                })
                            })
                        } else {
                            window.location = "inregistrare.html";
                        }
                    })
                })

            });
        })

        let categoriesRelax = ["pizza-section", "gustari-section", "garnituri-section",
            "ciorbe-section", "micdejun-section", "sushi-section",
            "peste-section", "salate-section", "bere-section", "carne-section"];

        let categoryFilter = document.querySelector(".filter-section").querySelector(".content").querySelector(".categories").querySelector(".popup").querySelector(".content");

        for (let i = 1; i < categoryFilter.children.length; i++) {
            categoryFilter.children[i].classList.add("selected");
        }

        function deleteItem(arr, item) {
            var index = arr.indexOf(item);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        console.log(selectedCategories);

        for (let i = 1; i < categoryFilter.children.length; i++) {
            categoryFilter.children[i].addEventListener("click", () => {
                if (!categoryFilter.children[i].classList.contains("selected")) {
                    selectedCategories.push(categoriesRelax[i - 1]);
                } else {
                    deleteItem(selectedCategories, categoriesRelax[i - 1])
                }
                displayFiltered(starsCount, slider.value, selectedCategories, searchField.value);
            })
        }

        for (let i = 0; i < starsContainer.children.length; i++) {
            starsContainer.children[i].addEventListener("click", () => {
                starsCount = i + 1;
                displayFiltered(starsCount, slider.value, selectedCategories, searchField.value);
            })
        }

        searchField.addEventListener("input", () => {
            console.log(searchField.value);
            displayFiltered(starsCount, slider.value, selectedCategories, searchField.value);
        })

        slider.addEventListener("input", () => {
            displayFiltered(starsCount, slider.value, selectedCategories, searchField.value);
        })



        submitProduct.addEventListener("click", () => {

            if (photoProduct.files[0] != null && nameProduct.value != "" && priceProduct.value != "" && descriptionProduct.value != "") {
                productsDB.add({
                    stars: 5,
                    name: nameProduct.value,
                    description: descriptionProduct.value,
                    category: categoryProduct.value,
                    price: Number(priceProduct.value),
                    photoURL: "",
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
            } else {
                window.alert("Umpleți toate casetele");
            }
        });
    }
});
