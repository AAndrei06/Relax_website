const adminBtnsEdit = document.querySelector(".admin-buttons");
const articleImg = document.querySelector(".contents>.initial>.article-img>img");
const articleName = document.querySelector(".contents>.initial>.article-name");
const articleDate = document.querySelector(".contents>.initial>.article-date");
const addedText = document.querySelector(".added");
const adminSave = document.querySelector(".save");
let is_current_user_admin = false;
const url = new URL(document.location);
let DocumentID = url.searchParams.get("id");
firebase.auth().onAuthStateChanged((fuser) => {
    if (fuser) {

        usersDB.where("ID", "==", fuser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((obj) => {
                console.log("enter");
                if (obj.data().ID == fuser.uid) {
                    is_current_user_admin = true;
                    console.log("ok", is_current_user_admin);
                }
            })
        }).then(() => {
            if (is_current_user_admin == false) {
                adminBtnsEdit.style.display = "none";
            }
        });
    }

    function removeUnnecesaryThings() {
        addedText.addEventListener("focusout",() => {
            for (let i = 0;i < addedText.children.length;i++){
                if (addedText.children[i].innerHTML == ""){
                    addedText.children[i].remove();
                }
            }
        })
    }
    removeUnnecesaryThings();
    articlesDB.doc(DocumentID).get().then((object) => {
        articleImg.src = object.data().photoURL;
        articleName.textContent = object.data().name;
        articleDate.textContent = formatDate(object.data().datePosted);
        for (let i = 0; i < object.data().textTypes.length; i++) {
            if (object.data().textTypes[i].startsWith("BIGTXT2023CODE")) {
                addedText.innerHTML += `<div contenteditable="true" class="header">${object.data().textTypes[i].slice(14)}</div>`;
            } else if (object.data().textTypes[i].startsWith("SMALLTXT2023CODE")) {
                addedText.innerHTML += `<div contenteditable="true" class="paragraph">${object.data().textTypes[i].slice(16)}</div>`;
            }
        }
    });

    adminSave.onclick = function () {
        console.log("updating");
        let allTexts = [];
        for (let i = 0; i < addedText.children.length; i++) {
            if (addedText.children[i].className == "paragraph") {
                allTexts.push("SMALLTXT2023CODE" + addedText.children[i].innerHTML);
            } else if (addedText.children[i].className == "header") {
                allTexts.push("BIGTXT2023CODE" + addedText.children[i].innerHTML);
            }
        }
        articlesDB.doc(DocumentID).update({
            textTypes: allTexts,
        });
    }

});