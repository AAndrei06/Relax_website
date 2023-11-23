is_current_user_admin = false;
const addArticelBtn = document.querySelector(".add-article");
const articlesSection = document.querySelector(".articles");
//const allArticlesLinks = articlesSection.querySelectorAll(".articol");
let allArticlesEditBtns = null;
let allImgsSendUser = null;
const ArticlePopup = document.getElementsByClassName("article-popup")[0];
const articleImgForm = document.getElementById("article-img-add");
const articleNameForm = document.getElementById("article-name");
const previewImg = document.querySelector(".preview-img");
const btnFormAdd = document.getElementById("btn-form-add");
const btnFormDelete = document.getElementById("btn-form-delete");
const articlePopupOverlay = document.getElementById("article-overlay");
let operation = "";
let currentID = "";

function openArticlePopup() {
    articlePopupOverlay.classList.add('show');
    ArticlePopup.classList.add('show');
}


articlesDB.onSnapshot((snapshot) => {
    let docs = snapshot.docs;
    articlesSection.innerHTML = "";
    for (let i = 0; i < docs.length; i++) {
        articlesSection.innerHTML += `
        
        <a class="articol">
            <div class="img unique-img-div" id="${docs[i].id}">
                <img src="${docs[i].data().photoURL}" class = "img-send-user" alt="Imagine cu Night Party">
                <button value = "${docs[i].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                        fill="none">
                        <g clip-path="url(#clip0_83_1838)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13.8988 1.25229C13.1177 0.471243 11.8514 0.47124 11.0703 1.25229L1.63195 10.6907C1.35275 10.9699 1.16244 11.3255 1.08501 11.7126L0.693626 13.6696C0.507034 14.6025 1.32959 15.4251 2.26255 15.2385L4.21945 14.8471C4.60663 14.7697 4.96223 14.5794 5.24143 14.3002L14.6798 4.86176C15.4609 4.08072 15.4609 2.81439 14.6798 2.03334L13.8988 1.25229ZM12.0131 2.1951C12.2735 1.93475 12.6956 1.93475 12.956 2.1951L13.737 2.97615C13.9974 3.2365 13.9974 3.6586 13.737 3.91896L11.9559 5.70002L10.2321 3.97616L12.0131 2.1951ZM9.28926 4.91897L2.57476 11.6335C2.48169 11.7266 2.41826 11.8451 2.39245 11.9742L2.00107 13.931L3.95796 13.5396C4.08702 13.5138 4.20555 13.4504 4.29862 13.3574L11.0131 6.64282L9.28926 4.91897Z"
                                fill="var(--day-dark01)" />
                        </g>
                        <defs>
                            <clipPath id="clip0_83_1838">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
            <span class="name">${docs[i].data().name}</span>
            <span class="date">${formatDate(docs[i].data().datePosted)}</span>
        </a>
        `;
    }

    allImgsSendUser = document.querySelectorAll(".unique-img-div");
    allImgsSendUser.forEach((image) => {
        image.addEventListener("click", () => {
            console.log(image.id);
            window.location.href = `articol.html?id=${image.id}`;
        })
    })

    allArticlesEditBtns = document.querySelectorAll(".articles>.articol>.img>button");
    allArticlesEditBtns.forEach((button) => {
        button.addEventListener("click", (event) => {
            operation = "editingArticle";
            currentID = button.value;
            if (operation == "editingArticle") {
                document.querySelector(".delete").style.display = "block";
                document.querySelector(".delete").classList.add("active");
                btnFormAdd.innerText = "Editează";
                articlesDB.doc(button.value).get().then((object) => {
                    articleNameForm.value = object.data().name;
                    articleImgForm.src = object.data().photoURL;
                })
            }
            event.stopPropagation();
            openArticlePopup();

        })
    });

});

firebase.auth().onAuthStateChanged((fuser) => {

    console.log(allArticlesEditBtns);
    if (fuser) {
        loggedUser = fuser;
        console.log("is_user");
        usersDB.where("admin", "==", true).get().then((querySnapshot) => {
            querySnapshot.forEach((obj) => {
                console.log("enter");
                if (obj.data().ID == loggedUser.uid) {
                    is_current_user_admin = true;
                    console.log("ok", is_current_user_admin);
                }
            })
        }).then(() => {
            if (!is_current_user_admin) {
                addArticelBtn.classList.remove("show");
                allArticlesEditBtns.forEach((btn) => {
                    btn.style.display = "none";
                })
            }
        })
    }


    addArticelBtn.onclick = function () {
        articleNameForm.value = "";
        articleImgForm.files[0] = null;
        operation = "addingArticle";
        document.querySelector(".delete").style.display = "none";
        btnFormAdd.innerText = "Adaugă";
        console.log(operation);
    }

    btnFormDelete.onclick = function(){
        if (operation == "editingArticle" && currentID != ""){
            articlesDB.doc(currentID).delete().then(() => {
                articlePopupOverlay.click();
            });
        }
    }

    btnFormAdd.onclick = function () {
        if (operation == "addingArticle") {
            let file = articleImgForm.files[0];
            let name = articleNameForm.value;
            let date = new Date();

            if (file != null && name != "") {
                articlesDB.add({
                    datePosted: date.getTime(),
                    name: name,
                    photoURL: "",
                    textTypes:[],
                    likes: [],
                }).then((object) => {
                    firebase.storage().ref().child('/' + object.id + ".png").put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((urlfile) => {
                            downloadURLFile = urlfile;
                            articlesDB.doc(object.id).update({
                                photoURL: downloadURLFile,
                            })
                        }).then(() => {
                            document.getElementById("article-overlay").click();
                        });
                    })
                });
            } else {
                document.getElementById("article-overlay").click();
                window.alert("Introduce-ți toate informațiile");
            }
        }else if (operation == "editingArticle"){
            let file = articleImgForm.files[0];
            let name = articleNameForm.value;
            if (file != null && name != ""){
                articlesDB.doc(currentID).update({
                    name:name,
                    photoURL:"",
                }).then((object) => {
                    firebase.storage().ref().child('/' + currentID + ".png").put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((urlfile) => {
                            downloadURLFile = urlfile;
                            articlesDB.doc(currentID).update({
                                photoURL: downloadURLFile,
                            })
                        }).then(() => {
                            document.getElementById("article-overlay").click();
                        });
                    })
                });
            }
        }
    }

});