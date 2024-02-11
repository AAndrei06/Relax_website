const adminBtnsEdit = document.querySelector(".admin-buttons");
const articleImg = document.querySelector(".contents>.initial>.article-img>img");
const articleImgDiv = document.querySelector(".contents>.initial>.article-img");
const articleName = document.querySelector(".contents>.initial>.article-name");
const articleDate = document.querySelector(".contents>.initial>.article-date");
const addedText = document.querySelector(".added");
const adminSave = document.querySelector(".save");
const likeBTN = document.querySelector(".likes");
const likeFill = document.querySelector(".fill");
const likesCount = document.getElementById("likes-number-count");
const postComment = document.getElementById("comment-post-btn");
const textAreaComment = document.getElementById("text-area-comment");
const commentsArea = document.getElementsByClassName("comments")[1];
const commentsCount = document.getElementById("nr-of-comments");
let is_current_user_admin = false;
let fuser = null;
const url = new URL(document.location);
let DocumentID = url.searchParams.get("id");
firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        fuser = user;
    }

    try
    {
        usersDB.where("ID", "==", fuser.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((obj) =>
            {
                console.log("enter");
                if (obj.data().admin == true)
                {
                    is_current_user_admin = true;
                }
            })
        }).then(() =>
        {
            const initialPlaceholder = document.querySelector('.contents>.initial>.placeholder');
            initialPlaceholder.style.display = 'none';
            articleImgDiv.style.display = 'initial';
            articleName.style.display = 'initial';
            articleDate.style.display = 'initial';

            const contentPlaceholder = document.querySelector(".contents>.added>.placeholder");
            contentPlaceholder.style.display = 'none'

            const addCommentWrap = document.querySelector('.contents>.end>.wrap');
            const addComment = document.querySelector('.contents>.end>#add-comment');
            const addCommentPlaceholder = document.querySelector('.contents>.end>.placeholder');

            addCommentPlaceholder.style.display = 'none';

            addCommentWrap.style.display = 'flex';
            addComment.style.display = 'initial';




            if (is_current_user_admin == false)
            {

                articlesDB.doc(DocumentID).get().then((object) =>
                {
                    articleImg.src = object.data().photoURL;
                    likesCount.innerHTML = object.data().likes.length;
                    if (object.data().likes.includes(fuser.uid))
                    {
                        likeFill.classList.add("show");
                    }
                    articleName.textContent = object.data().name;
                    articleDate.textContent = formatDate(object.data().datePosted);
                    for (let i = 0; i < object.data().textTypes.length; i++)
                    {
                        if (object.data().textTypes[i].startsWith("BIGTXT2023CODE"))
                        {
                            addedText.innerHTML += `<div contenteditable="false" class="header">${object.data().textTypes[i].slice(14)}</div>`;
                        } else if (object.data().textTypes[i].startsWith("SMALLTXT2023CODE"))
                        {
                            addedText.innerHTML += `<div contenteditable="false" class="paragraph">${object.data().textTypes[i].slice(16)}</div>`;
                        }
                    }
                })
            } else
            {
                adminBtnsEdit.style.display = "flex";
                articlesDB.doc(DocumentID).get().then((object) =>
                {
                    articleImg.src = object.data().photoURL;
                    likesCount.innerHTML = object.data().likes.length;
                    if (object.data().likes.includes(fuser.uid))
                    {
                        likeFill.classList.add("show");
                    }
                    articleName.textContent = object.data().name;
                    articleDate.textContent = formatDate(object.data().datePosted);
                    for (let i = 0; i < object.data().textTypes.length; i++)
                    {
                        if (object.data().textTypes[i].startsWith("BIGTXT2023CODE"))
                        {
                            addedText.innerHTML += `<div contenteditable="true" class="header">${object.data().textTypes[i].slice(14)}</div>`;
                        } else if (object.data().textTypes[i].startsWith("SMALLTXT2023CODE"))
                        {
                            addedText.innerHTML += `<div contenteditable="true" class="paragraph">${object.data().textTypes[i].slice(16)}</div>`;
                        }
                    }
                })

                // Paragraph red hover

                // const allParagraphs = document.querySelectorAll('.contents>.added>.paragraph')

                // allParagraphs.forEach(paragraph =>
                // {
                //     paragraph.addEventListener('onmouseenter', () =>
                //     {
                //         console.log('vasea')
                //         paragraph.classList.add('hover')
                //     })
                //     paragraph.addEventListener('onmouseleave', () =>
                //     {
                //         paragraph.classList.remove('hover')
                //     })
                // })
            }
        });
    } catch (err)
    {


        adminBtnsEdit.style.display = "none";
        articlesDB.doc(DocumentID).get().then((object) =>
        {
            articleImg.src = object.data().photoURL;
            likesCount.innerHTML = object.data().likes.length;
            articleName.textContent = object.data().name;
            articleDate.textContent = formatDate(object.data().datePosted);
            for (let i = 0; i < object.data().textTypes.length; i++)
            {
                if (object.data().textTypes[i].startsWith("BIGTXT2023CODE"))
                {
                    addedText.innerHTML += `<div contenteditable="false" class="header">${object.data().textTypes[i].slice(14)}</div>`;
                } else if (object.data().textTypes[i].startsWith("SMALLTXT2023CODE"))
                {
                    addedText.innerHTML += `<div contenteditable="false" class="paragraph">${object.data().textTypes[i].slice(16)}</div>`;
                }
            }
        })


    }

    postComment.addEventListener("click", (event) =>
    {
        event.preventDefault();
        if (fuser == null)
        {
            window.alert('Nu esti conectat in account');
        }
        else if (textAreaComment.value == '')
        {
            window.alert('scrie ceva')
        }
        else
        {
            let textValue = textAreaComment.value;
            let date = new Date();

            commentsDB.add({
                author: fuser.uid,
                ID: DocumentID,
                text: textValue,
                datePosted: Number(date.getTime()),
            }).then(() =>
            {
                textAreaComment.value = "";
            });
        }

    })

    commentsDB.onSnapshot((snapshot) =>
    {

        commentsArea.innerHTML = "";
        commentsCount.innerHTML = 0;
        let commentsList = snapshot.docs;
        commentsList.sort(compar);

        for (let object of commentsList)
        {
            if (object.data().ID == DocumentID)
            {
                usersDB.where("ID", "==", object.data().author).get().then((querySnapshot) =>
                {
                    querySnapshot.forEach((auth) =>
                    {
                        commentsArea.innerHTML += `
                            <div class="comment">
                                <div class="header">
                                    <div class="img">
                                        <img src="${auth.data().photoURL}" alt="Imaginea de profil a lui ${auth.data().name}">
                                    </div>
                                    <div class="text">
                                        <div class="name">${auth.data().name}</div>
                                        <div class="date">${formatDate(object.data().datePosted)}</div>
                                    </div>
                                </div>
                                <p>${object.data().text}</p>
                            </div>
                            `;
                        commentsCount.innerHTML = Number(commentsCount.innerHTML) + 1;
                    })
                })
            }
        }

    })


    function deleteItem(arr, item)
    {
        var index = arr.indexOf(item);
        if (index !== -1)
        {
            arr.splice(index, 1);
        }
    }

    let likeTimeout;
    let likesList;
    const likesDiv = document.querySelector(".contents>.end>.wrap>.likes");

    articlesDB.doc(DocumentID).get().then((object) =>
    {
        likesDiv.style.pointerEvents = 'initial';
        likesList = object.data().likes;
        likeBTN.addEventListener('click', () =>
        {
            if (fuser == null)
            {
                window.alert('Nu esti conectat in account');
            }
            else
            {
                if (likesList.includes(fuser.uid))
                {
                    likeFill.classList.remove("show");
                    likesCount.innerText = Number(likesCount.innerText) - 1;
                    deleteItem(likesList, fuser.uid);

                } else
                {
                    likeFill.classList.add("show");
                    likesCount.innerText = Number(likesCount.innerText) + 1;
                    likesList.push(fuser.uid);

                }
                clearTimeout(likeTimeout);
                likeTimeout = setTimeout(() =>
                {
                    articlesDB.doc(DocumentID).update({
                        likes: likesList,
                    }, 50);
                })
            }


        })
    })





    function removeUnnecesaryThings()
    {
        addedText.addEventListener("focusout", () =>
        {
            for (let i = 0; i < addedText.children.length; i++)
            {
                if (addedText.children[i].innerHTML == "")
                {
                    addedText.children[i].remove();
                }
            }
        })
    }
    removeUnnecesaryThings();


    adminSave.onclick = function ()
    {
        console.log("updating");
        let allTexts = [];
        for (let i = 0; i < addedText.children.length; i++)
        {
            if (addedText.children[i].className == "paragraph")
            {
                allTexts.push("SMALLTXT2023CODE" + addedText.children[i].innerHTML);
            } else if (addedText.children[i].className == "header")
            {
                allTexts.push("BIGTXT2023CODE" + addedText.children[i].innerHTML);
            }
        }
        articlesDB.doc(DocumentID).update({
            textTypes: allTexts,
        });
    }

});

