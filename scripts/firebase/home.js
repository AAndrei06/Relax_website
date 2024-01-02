let article1 = document.querySelector('#article1');
let article2 = document.querySelector('#article2');
let article3 = document.querySelector('#article3');

let articleHTML = [article1, article2, article3];

articlesDB.get().then((querySnapshot) =>
{
    let articles = [];
    querySnapshot.forEach((object) =>
    {
        articles.push(object);
    })

    articles.sort(compar);

    articleHTML.forEach((art, index) =>
    {
        art.href = `/pages/articol.html?id=${articles[index].id}`

        let artData = art.querySelector('.article>.data>.date');
        artData.innerHTML = `${formatDate(articles[index].data().datePosted)}`;

        let artName = art.querySelector('.article>.data>h3');
        artName.innerHTML = `${articles[index].data().name}`;

        artImage = art.querySelector('.article>img');
        artImage.src = `${articles[index].data().photoURL}`;
    })
})