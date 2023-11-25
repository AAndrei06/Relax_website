const articlesSection = document.querySelector(".articles");
articlesSection.innerHTML = "";
document.getElementsByTagName("body")[0].style.display = "block";
articlesDB.get().then((querySnapshot) => {
    let articles = [];
    querySnapshot.forEach((object) => {
        articles.push(object);
    })

    articles.sort(compar);
    for (let object of articles) {
        articlesSection.innerHTML += `
            <a id="article1">
                <div class="article">

                    <div class="data">
                        <p class="date">${formatDate(object.data().datePosted)}</p>
                        <h3>${object.data().name}</h3>
                    </div>

                    <img src="${object.data().photoURL}" alt="Imagine cu un DJ" loading="lazy">

                </div>
            </a>
        `;
    }
}).then(() => {
    while (articlesSection.children.length > 3) {
        articlesSection.children[articlesSection.children.length - 1].remove();
    }
});