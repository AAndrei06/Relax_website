import { lockScroll, unlockScroll, assignStars, starsAnim, deleteTextAnim, generateMongoLikeID, formatDate, displayImage } from "../utils.js";

let currentID = '';
const itemQuantityMap = new Map();
let sideMenuIDs = [];
let addItemBool = false;
let currentEditID = "";

const createReviewImg = document.querySelector(".item-popup>.reviews-side>.content>.create-review>.front>.img>img");
const createReviewName = document.querySelector(".item-popup>.reviews-side>.content>.create-review>.front>.name");
const addItemButton = document.querySelector(".add-item-bttn");
const adminItemPopup = document.querySelector('.admin-item-popup');
const adminItemOverlay = document.querySelector('#admin-item-overlay');
const adminExtraButtons = document.querySelector('.admin-item-extra-buttons');
const adminPopupInputs = document.querySelectorAll('.admin-item-popup>.inputs>.input>input');
const adminPopupTextarea = document.querySelector('.admin-item-popup>.inputs>.input>textarea');
const adminPopupChangeBttn = document.querySelector('.admin-item-popup>.image>.change');
const adminPopupImgSVG = document.querySelector(".admin-item-popup>.image>.add");
const adminExtraDelete = document.querySelector('#extra-delete');
const adminExtraAction = document.querySelector('#extra-action');
const adminCategorySelect = document.querySelector('#admin-item-category');
const adminForm = document.querySelector('#admin-form')
const adminAddImage = document.querySelector('#admin-item-photo')

let adminPopupImage = adminItemPopup.querySelector('.admin-item-popup>.image>img');
let adminPopupName = adminItemPopup.querySelector('#admin-item-name');
let adminPopupPrice = adminItemPopup.querySelector('#admin-item-price');
let adminPopupDescription = adminItemPopup.querySelector('#admin-item-description');
let adminPopupMasa = adminItemPopup.querySelector('#admin-item-masa');

let accountAdmin = false
let accountName = ''
let accountImage;

function openAdminPopup()
{
    lockScroll();
    adminItemPopup.classList.add('show');
    adminItemOverlay.classList.add('show');
    adminExtraButtons.classList.add('show');
}
function closeAdminPopup()
{
    unlockScroll()
    adminItemPopup.classList.remove('show');
    adminItemOverlay.classList.remove('show');
    adminExtraButtons.classList.remove('show');

    setTimeout(() =>
    {

        adminExtraDelete.classList.remove('show');

        adminPopupImage.value = '';
        adminPopupName.value = '';
        adminPopupPrice.value = '';
        adminPopupDescription.value = '';
        adminPopupMasa.value = '';

        adminPopupImage.classList.remove('show')

        adminAddImage
        let label = adminAddImage.parentElement
        let previewImg = label.nextElementSibling

        label.classList.remove('img')
        previewImg.classList.remove('show');
        label.children[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                        <path
                            d="M57.0556 63.75L50.3832 57.1336C47.1636 53.9404 45.5536 52.344 43.7064 51.7604C42.0816 51.2472 40.3352 51.266 38.7219 51.8144C36.8875 52.438 35.3126 54.0688 32.1627 57.3304L16.1764 73.1204M57.0556 63.75L58.4212 62.396C61.6448 59.1992 63.2564 57.6008 65.106 57.0172C66.7324 56.504 68.48 56.5244 70.0944 57.0748C71.9296 57.7004 73.5044 59.3356 76.6536 62.6056L80 65.9736M57.0556 63.75L73.1 79.826M16.1764 73.1204C16.3005 74.1284 16.5118 74.9252 16.872 75.632C17.6389 77.1372 18.8628 78.3612 20.3681 79.128C22.0794 80 24.3196 80 28.8 80H67.2C69.8172 80 71.6704 80 73.1 79.826M16.1764 73.1204C16 71.6884 16 69.83 16 67.2V28.8C16 24.3196 16 22.0794 16.872 20.3681C17.6389 18.8628 18.8628 17.6389 20.3681 16.872C22.0794 16 24.3196 16 28.8 16H67.2C71.6804 16 73.9208 16 75.632 16.872C77.1372 17.6389 78.3612 18.8628 79.128 20.3681C80 22.0794 80 24.3196 80 28.8V65.9736M80 65.9736V67.2C80 71.6804 80 73.9208 79.128 75.632C78.3612 77.1372 77.1372 78.3612 75.632 79.128C74.9204 79.4908 74.1172 79.7024 73.1 79.826M68 35.9996C68 40.418 64.4184 43.9996 60 43.9996C55.5816 43.9996 52 40.418 52 35.9996C52 31.5813 55.5816 27.9996 60 27.9996C64.4184 27.9996 68 31.5813 68 35.9996Z"
                            stroke="white" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`

    }, 100)



}

adminAddImage.addEventListener('change', (e) =>
{
    let selectedFile = e.target.files[0];
    let label = e.target.parentElement
    let previewImg = label.nextElementSibling

    if (selectedFile)
    {
        label.classList.add('img')
        displayImage(selectedFile, previewImg);
        previewImg.classList.add('show');
        label.children[1].innerHTML = 'Schimbă'
    }
    else
    {
        label.classList.remove('img')
        previewImg.classList.remove('show');
        label.children[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                        <path
                            d="M57.0556 63.75L50.3832 57.1336C47.1636 53.9404 45.5536 52.344 43.7064 51.7604C42.0816 51.2472 40.3352 51.266 38.7219 51.8144C36.8875 52.438 35.3126 54.0688 32.1627 57.3304L16.1764 73.1204M57.0556 63.75L58.4212 62.396C61.6448 59.1992 63.2564 57.6008 65.106 57.0172C66.7324 56.504 68.48 56.5244 70.0944 57.0748C71.9296 57.7004 73.5044 59.3356 76.6536 62.6056L80 65.9736M57.0556 63.75L73.1 79.826M16.1764 73.1204C16.3005 74.1284 16.5118 74.9252 16.872 75.632C17.6389 77.1372 18.8628 78.3612 20.3681 79.128C22.0794 80 24.3196 80 28.8 80H67.2C69.8172 80 71.6704 80 73.1 79.826M16.1764 73.1204C16 71.6884 16 69.83 16 67.2V28.8C16 24.3196 16 22.0794 16.872 20.3681C17.6389 18.8628 18.8628 17.6389 20.3681 16.872C22.0794 16 24.3196 16 28.8 16H67.2C71.6804 16 73.9208 16 75.632 16.872C77.1372 17.6389 78.3612 18.8628 79.128 20.3681C80 22.0794 80 24.3196 80 28.8V65.9736M80 65.9736V67.2C80 71.6804 80 73.9208 79.128 75.632C78.3612 77.1372 77.1372 78.3612 75.632 79.128C74.9204 79.4908 74.1172 79.7024 73.1 79.826M68 35.9996C68 40.418 64.4184 43.9996 60 43.9996C55.5816 43.9996 52 40.418 52 35.9996C52 31.5813 55.5816 27.9996 60 27.9996C64.4184 27.9996 68 31.5813 68 35.9996Z"
                            stroke="white" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`
    }
});

addItemButton.addEventListener('click', () =>
{
    addItemBool = true;
    currentEditID = "";
    adminPopupInputs.forEach(input =>
    {
        input.nextElementSibling.classList.remove('move')

    })
    adminExtraAction.innerHTML = `
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
                    <g clip-path="url(#clip0_298_2425)">
                        <path d="M11.9995 1.61084V24.3896" stroke="var(--day-dark01)" stroke-width="2.99998"
                            stroke-linecap="round" />
                        <path d="M23.0039 13.0005L0.99564 13.0005" stroke="var(--day-dark01)" stroke-width="2.99998"
                            stroke-linecap="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_298_2425">
                            <rect width="24" height="24.7705" fill="var(--day-white01)" transform="translate(0 0.614258)" />
                        </clipPath>
                    </defs>
                </svg>`

    adminPopupTextarea.nextElementSibling.classList.remove('move')
    adminCategorySelect.value = 'pizza-section'
    openAdminPopup()
})
adminItemOverlay.addEventListener('click', () =>
{
    closeAdminPopup()
})

adminExtraDelete.addEventListener('click', () =>
{
    if (addItemBool = true && currentEditID != "")
    {
        productsDB.doc(currentEditID).delete().then(() =>
        {
            location.reload()
        });
    }
    closeAdminPopup();
})
adminForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    if (!addItemBool)
    {
        // Update current item
    }
    else
    {
        if (addItemBool && accountAdmin)
        {
            productsDB.add({
                name: adminPopupName.value,
                description: adminPopupDescription.value,
                category: adminCategorySelect.value,
                price: Number(adminPopupPrice.value),
                masa: Number(adminPopupMasa.value),
                photoURL: "",
                reviews: [],
            }).then((object) =>
            {
                let file = adminAddImage.files[0];
                console.log(file)
                firebase.storage().ref().child('/' + object.id + ".png").put(file).then((snapshot) =>
                {
                    snapshot.ref.getDownloadURL().then((urlfile) =>
                    {
                        productsDB.doc(object.id).update({
                            photoURL: urlfile,
                        })
                    }).then(() =>
                    {
                        location.reload();
                    });
                })
            })
        }


    }


    closeAdminPopup()
})

// Admin Inputs

adminPopupInputs.forEach(input =>
{
    input.addEventListener('focus', (e) =>
    {
        e.target.nextElementSibling.classList.add('move')
    })
    input.addEventListener('blur', (e) =>
    {
        if (e.target.value == '')
        {
            e.target.nextElementSibling.classList.remove('move')
        }
    })
})

adminPopupTextarea.addEventListener('focus', (e) =>
{
    e.target.nextElementSibling.classList.add('move')
})
adminPopupTextarea.addEventListener('blur', (e) =>
{
    if (e.target.value == '')
    {
        e.target.nextElementSibling.classList.remove('move')
    }
})

firebase.auth().onAuthStateChanged((user) =>
{
    if (user)
    {
        usersDB.where("ID", "==", user.uid).get().then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) =>
            {
                createReviewImg.src = doc.data().photoURL
                createReviewName.innerHTML = doc.data().name
                accountName = doc.data().name
                accountImage = doc.data().photoURL
                if (doc.data().admin)
                {
                    addItemButton.style.display = 'flex'
                    accountAdmin = true;
                }
            });
        })
        productsDB.get().then((querySnapshot) =>
        {
            filterAndRender(querySnapshot);

            categories.forEach(category =>
            {
                category.addEventListener('click', (e) =>
                {
                    e.target.classList.toggle('selected');
                    updateMainCategories();
                    filterAndRender(querySnapshot);
                })
            })


            slider.addEventListener('input', () =>
            {
                const progressValue = (slider.value / slider.max) * 100;
                sliderProgress.style.width = `${progressValue}%`

                const valueRect = sliderValue.getBoundingClientRect();
                sliderValue.style.left = `calc(${progressValue}% - ${valueRect.width / 2}px + 4px) `
                sliderValue.textContent = slider.value
                price = slider.value;
                filterAndRender(querySnapshot)
            });

            mainSearch.addEventListener('input', () =>
            {
                filterAndRender(querySnapshot)
            })
        })
    }
});

const itemOverlay = document.querySelector('#item-overlay');
const itemPopup = document.querySelector(".item-popup");

const popupImage = document.querySelector('.item-popup>.image>img')
const popupName = document.querySelector('.item-popup>.text>.header>.main>.name')
const popupPrice = document.querySelector('.item-popup>.text>.header>.main>.price')
const popupStars = document.querySelector('.item-popup>.text>.reviews>.stars')
const popupReviewsNum = document.querySelector('.item-popup>.text>.reviews>.num>.reviews-num')
const popupDescription = document.querySelector('.item-popup>.text>.description')
const popupMasa = document.querySelector('.item-popup>.text>.end>.masa>span')
const popupItemQuantity = document.querySelector('.item-popup>.text>.end>button>span')
const popupButton = document.querySelector('.item-popup>.text>.end>button')
const popupReviewsDiv = document.querySelector(".item-popup>.reviews-side>.content>.reviews")

const reviewSide = document.querySelector('.reviews-side')
const reviewStars = document.querySelector('.item-popup>.reviews-side>.content>.header>.first>.reviews-stats>.stars-div>.stars')
const reviewReviewsNum = document.querySelector('.item-popup>.reviews-side>.content>.header>.first>.reviews-stats>.stars-div>.reviews-num')

const newPoint = document.querySelector(".menu-bttn>.wrap>.new");
const ordersDiv = document.querySelector(".menu-side>.wrap>.orders");
const ordersPriceDiv = document.querySelector('.menu-side>.wrap>.checkout>span>.price');
const ordersEmpty = document.querySelector('.menu-side>.wrap>.empty');

const checkoutButton = document.querySelector('.menu-side>.wrap>.checkout>button');
const checkoutTotalSpan = document.querySelector('.menu-side>.wrap>.checkout>span');

const allSections = document.querySelector('.categories-sections')

// const menuItems =
// {
//     "pizza-section": [
//         {
//             name: "BBQ Pizza Super Crocant",
//             price: "110",
//             img: "../assets/Account/pizza.png",
//             reviews: [
//                 {
//                     name: "Andrei Arseni",
//                     date: "7 septembrie 2023",
//                     stars: "5",
//                     description: "Marcare buna",
//                     img: "../assets/Account/pizza.png"
//                 },
//                 {
//                     name: "Artur Gisca",
//                     date: "3 noiembrie 2023",
//                     stars: "4",
//                     description: "Marcarea mere",
//                     img: "../assets/Account/pizza2.png"
//                 },
//                 {
//                     name: "Artur Gisca",
//                     date: "3 noiembrie 2023",
//                     stars: "1",
//                     description: "Leva",
//                     img: "../assets/Account/pizza2.png"
//                 },

//             ],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.720",
//             uid: "Abcwasda42wda421sfa",
//         },
//         {
//             name: "Omleta Bacon cu Ciuperci",
//             price: "135",
//             img: "../assets/Account/pizza2.png",
//             reviews: [],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "dsadaw",
//         },
//         {
//             name: "Salata",
//             price: "35",
//             img: "../assets/Account/pizza.png",
//             reviews: [],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "ds4ad312312574aw",
//         },
//         {
//             name: "Salata Mexicana",
//             price: "85",
//             img: "../assets/Account/pizza.png",
//             reviews: [],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "dsad32112312574aw",
//         },
//         {
//             name: "Dulce",
//             price: "15",
//             img: "../assets/Account/pizza.png",
//             reviews: [],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "dsad31231257sss4aw",
//         },
//         {
//             name: "Invers",
//             price: "175",
//             img: "../assets/Account/pizza2.png",
//             reviews: [{
//                 name: "Andrei Arseni",
//                 date: "7 septembrie 2023",
//                 stars: "5",
//                 description: "Marcare buna",
//                 img: "../assets/Account/pizza.png"
//             },],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "sallArtafostaici",
//         },


//     ],
//     "gustari-section": [

//         {
//             name: "Invers",
//             price: "175",
//             img: "../assets/Account/pizza2.png",
//             reviews: [{
//                 name: "Andrei Arseni",
//                 date: "7 septembrie 2023",
//                 stars: "5",
//                 description: "Marcare buna",
//                 img: "../assets/Account/pizza.png"
//             },],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.220",
//             uid: "dsadawdawadwawdqwr2141daw",
//         },
//         {
//             name: "Vasea Pizza",
//             price: "50",
//             img: "../assets/Account/pizza.png",
//             reviews: [
//                 {
//                     name: "Andrei Arseni",
//                     date: "7 septembrie 2023",
//                     stars: "5",
//                     description: "Marcare buna",
//                     img: "../assets/Account/pizza.png"
//                 },
//                 {
//                     name: "Artur Gisca",
//                     date: "3 noiembrie 2023",
//                     stars: "4",
//                     description: "Marcarea mere",
//                     img: "../assets/Account/pizza2.png"
//                 },
//                 {
//                     name: "Artur Gisca",
//                     date: "3 noiembrie 2023",
//                     stars: "1",
//                     description: "Leva",
//                     img: "../assets/Account/pizza2.png"
//                 },

//             ],
//             description: "Blat pizza, sos pilati, cașcaval mozzarella, bacon, piept de pui, cabanos, porumb, ceapă roșie, sos swit, chili",
//             masa: "0.720",
//             uid: "Abcwasda42wda4231223121sfa",
//         },

//     ],
//     "garnituri-section": [],
//     "ciorbe-section": [],
//     "micdejun-section": [],
//     "sushi-section": [],
//     "peste-section": [],
//     "salate-section": [],
//     "bere-section": [],
//     "carne-section": [],

// }

// Filter

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('.slider>.value');
const sliderProgress = document.querySelector('.slider>.progress');
const mainSearch = document.querySelector('.filter-section>.content>.search>input')

const categories = document.querySelectorAll('.filter-section>.content>.categories>.popup>.content>.category')

let price = 500;
let mainStarsFilled = 5;
let categoriesIndexesArray;
updateMainCategories();

// Stars

const stars = document.querySelectorAll(".filter-section>.content>.stars>div>svg")

stars.forEach(star =>
{
    star.addEventListener('click', (e) =>
    {
        mainStarsFilled = starsAnim(stars, e.target, '.filter-section>.content>.stars>div>svg>.fill')
    })
})


function filterMenuItems(menuItems, criteria)
{

    return menuItems.filter(item =>
    {
        let stars = 5;
        if (item.reviews)
        {
            const reviews = item.reviews;
            let totalStars = 0;

            reviews.forEach(review =>
            {
                totalStars += Number(review.stars);
            });

            stars = Math.round(totalStars / reviews.length);
        }

        return criteria.every(criterion =>
        {
            const [field, value] = criterion;

            if (field === 'stars' && stars > value)
            {
                return false;
            }
            if (field === 'search' && !item.name.toLowerCase().includes(value.toLowerCase()))
            {
                return false;
            }
            if (field === 'price' && Number(item.price) > value)
            {
                return false;
            }
            return true;
        });
    });
}

function filterAndRender(querySnapshot)
{
    const criteria = [
        ['stars', mainStarsFilled],
        ['search', mainSearch.value],
        ['price', price],
    ];

    let menuItems = [];
    let menuIDs = []

    querySnapshot.forEach((product, index) =>
    {
        menuItems.push(product.data());
        menuIDs.push(product.id)

    })
    menuItems.forEach((item, index) =>
    {
        item.id = menuIDs[index]
    })

    let filteredItems = filterMenuItems(menuItems, criteria);

    filteredItems.sort((a, b) => a.name.localeCompare(b.name));

    const sections = allSections.querySelectorAll(`.menu-section`);
    sections.forEach(section =>
    {
        const items = section.querySelector('.items');
        items.innerHTML = '';
    })

    filteredItems.forEach((item, index) =>
    {
        const section = allSections.querySelector(`#${item.category}`);
        const items = section.querySelector('.items');

        let reviews = []
        if (item.reviews)
        {
            reviews = item.reviews
        }

        if (categoriesIndexesArray.includes(item.category) && categoriesIndexesArray.length !== 10)
        {
            section.style.display = 'none'
        }
        else
        {
            section.style.display = 'initial';
            items.innerHTML += `<menu-item name="${item.name}" price="${item.price}" img="${item.photoURL}" stars="${item.stars}"
                            reviews='${JSON.stringify(reviews)}'
                            description="${item.description}"
                            masa="${item.masa}" category="${item.category}" id="${item.id}"></menu-item>`;
        }

    })

    let emptySections = 0;
    allSections.querySelectorAll('section').forEach(section =>
    {
        const items = section.querySelector('.items');

        if (items && items.innerHTML == '')
        {
            section.style.display = 'none';
        }
        if (section.style.display == 'none')
        {
            emptySections += 1;
        }
    })
    if (emptySections == 10)
    {
        allSections.querySelector('.empty-section').classList.add('show')
    }
    else
    {
        allSections.querySelector('.empty-section').classList.remove('show')
    }

}

function updateMainCategories()
{
    categoriesIndexesArray = [];
    categories.forEach((category, index) =>
    {
        if (!category.classList.contains('selected'))
        {
            categoriesIndexesArray.push(category.getAttribute('data-value'))
        }
    })
}

// Exit Popup

itemOverlay.addEventListener('click', () =>
{
    itemPopup.classList.remove('show');
    itemOverlay.classList.remove('show');
    unlockScroll();
    reviewSide.classList.remove('show')
    popupButton.classList.remove('shake')
    resetReviewSlide()
})

// Checkout Page

checkoutButton.addEventListener('click', () =>
{
    if (sideMenuIDs.length > 0)
    {
        window.location.href = '/pages/checkout.html'
    }
})

function updateMenuSidebar()
{
    let ordersString = '';
    let ordersPrice = 0;

    sideMenuIDs.forEach(itemId =>
    {
        const item = itemQuantityMap.get(itemId);

        console.log(item)

        ordersPrice += Number(`${item.getAttribute('price')}`) * Number(`${item.numValue}`);

        if (item && item.numValue > 0)
        {
            ordersString += `<side-menu-item name="${item.getAttribute('name')}" stars="${item.starScore}" price="${item.getAttribute('price')}" img="${item.getAttribute('img')}"
                        quantity="${item.numValue}" uid="${item.getAttribute('id')}"></side-menu-item>`;
        }
    });
    if (ordersString == '')
    {
        ordersEmpty.classList.add('show')
        newPoint.classList.remove('show')
        checkoutButton.classList.remove("active")
        checkoutTotalSpan.classList.remove("active")
    }
    else
    {
        ordersEmpty.classList.remove('show')
        newPoint.classList.add('show')
        checkoutButton.classList.add("active")
        checkoutTotalSpan.classList.add("active")
    }
    ordersDiv.innerHTML = ordersString;
    ordersPriceDiv.innerText = ordersPrice;
}

function assignReviewNum(div, num)
{
    const pluralText = num === 1 ? 'recenzie' : 'recenzii';
    div.innerText = `${num} ${pluralText}`;
}

class MenuItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.numValue = 0;
        this.starScore = this.calculateStars();
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
      <style>
        *
      {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Roboto;
        user-select: none;
        z-index: 3;
      }
        :host {
            display: flex;
            width: 100%;
            flex-direction: column;
            cursor: pointer;
            height: 518px; 
            position: relative;
        }

        :host img {
            width: 100%;
            height: 300px;
            border-radius: 4px;
        }

        :host>.name {
            color: var(--day-dark01);
            font-size: 28px;
            font-weight: 700;
            margin-top: 8px;
            line-height: 42px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2
        }

        :host>.stars {
            white-space: nowrap;
            color: var(--day-gold);
            font-size: 24px;
            font-weight: 700;
            line-height: 42px;
            margin-top: -8px;
        }

        :host>.bottom
        {
            width: 100%;
            position: absolute;
            bottom: 0px;
            left: 0px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        :host>.bottom>.price,
        :host>.bottom>.price>span {
            color: var(--day-dark03);
            font-size: 24px;
            font-weight: 600;
            white-space: nowrap;
        }

        :host>.bottom>button {
            width: 100%;
            height: 40px;
            border-radius: 4px;
            background: var(--day-dark01);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: none;
            cursor: pointer;
            color: var(--day-white01);
            font-size: 16px;
            font-weight: 600;
            transition: opacity 0.1s linear;
        }
        :host>.bottom>button:hover
        {
            opacity: 0.9;
        }
        :host>.bottom>button:active
        {
            opacity: 1;
        }
        :host>.bottom>button>svg
        {
            transform: rotate(0deg);
            transition: all 0.1s ease-in-out;
            pointer-events:none;
        }
        :host>.bottom>button.shake>svg
        {
            transform: rotate(-15deg);
        }
        :host>.bottom>button>span
        {
            display: none;
        }
      </style>

      <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}" draggable="false" loading="lazy">
      <p class="name">${this.getAttribute('name')}</p>
      <p class="stars">
      ${assignStars(this.starScore)}
      </p>
      <div class="bottom">
        <p class="price"><span>${this.getAttribute('price')}</span> MDL</p>
        <button class="bttn" aria-label="Adaugă în coș">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none">
                <path
                    d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                    stroke="var(--day-white01)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span class="num"></span>
        </button>
      </div>

    `;
        const itemId = this.getAttribute('id');
        itemQuantityMap.set(itemId, this);

        const button = this.shadowRoot.querySelector('.bttn');

        button.addEventListener('click', (e) =>
        {
            e.stopPropagation();
            this.addNumValue();
            if (!sideMenuIDs.includes(itemId))
            {
                sideMenuIDs.push(itemId)
            }
            button.classList.add('shake');

            updateMenuSidebar()
        });

        this.addEventListener('click', () =>
        {
            // console.log(currentEditID = image.id)
            addItemBool = false;

            if (accountAdmin)
            {
                openAdminPopup()
                adminCategorySelect.value = this.getAttribute('category')

                adminPopupImage.classList.add('show')

                let label = adminAddImage.parentElement
                let previewImg = label.nextElementSibling

                label.classList.add('img')
                previewImg.classList.add('show');
                label.children[1].innerHTML = 'Schimbă'

                adminExtraDelete.classList.add('show')

                adminPopupImage.src = `${this.getAttribute('img')}`;

                adminPopupName.value = `${this.getAttribute('name')}`
                adminPopupPrice.value = `${this.getAttribute('price')}`
                adminPopupDescription.value = `${this.getAttribute('description')}`
                adminPopupMasa.value = `${this.getAttribute('masa')}`

                adminPopupInputs.forEach(input =>
                {
                    input.nextElementSibling.classList.add('move')

                })

                adminPopupTextarea.nextElementSibling.classList.add('move')

                adminExtraAction.innerHTML = `<svg xmlns = "http://www.w3.org/2000/svg" width = "32" height = "32" viewBox = "0 0 32 32" fill = "none">
            <path d="M5.3335 16.8146L11.8976 23.3332L26.6668 8.6665" stroke="var(--day-dark01)" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
</ >`
            }
            else
            {
                itemPopup.classList.add('show');
                itemOverlay.classList.add('show');
                lockScroll();

                popupImage.src = `${this.getAttribute('img')}`;

                popupName.innerText = `${this.getAttribute('name')}`
                popupPrice.innerText = `${this.getAttribute('price')} MDL`
                popupStars.innerText = `${assignStars(this.starScore)}`
                reviewStars.innerText = `${assignStars(this.starScore)}`
                popupDescription.innerText = `${this.getAttribute('description')}`
                popupMasa.innerText = `${this.getAttribute('masa')}`

                this.renderReviews()

                if (this.numValue > 0)
                {
                    popupItemQuantity.style.display = 'initial'
                    popupItemQuantity.innerText = `x ${this.numValue} `
                    popupButton.classList.add('shake')
                }
                else
                {
                    popupItemQuantity.style.display = 'none'
                    popupButton.classList.remove('shake')
                }

            }
            currentID = this.getAttribute('id')
            currentEditID = this.getAttribute('id')

        });

    }

    addNumValue()
    {
        const numSpan = this.shadowRoot.querySelector('.num');
        this.numValue++;
        numSpan.textContent = `x ${this.numValue} `;
        numSpan.style.display = 'initial';

        popupButton.classList.add('shake')
        this.shadowRoot.querySelector('.bttn').classList.add('shake');
    };

    updateNumValue()
    {
        const numSpan = this.shadowRoot.querySelector('.num');
        if (this.numValue > 0)
        {
            numSpan.textContent = `x ${this.numValue} `;
            numSpan.style.display = 'initial';
        }
        else
        {
            numSpan.style.display = 'none';
            this.shadowRoot.querySelector('.bttn').classList.remove('shake');
        }

    }

    renderReviews()
    {
        const reviews = JSON.parse(this.getAttribute('reviews'));
        if (reviews.length > 0)
        {
            popupReviewsDiv.classList.remove('none');
            let tempReviewsString = ''
            reviews.forEach(review =>
            {
                tempReviewsString += `<item-review name="${review.name}" stars="${review.stars}"
                            description="${review.description}" date="${review.date}"
                            img="${review.img}"></item-review>`;
            })

            popupReviewsDiv.innerHTML = tempReviewsString;
        }
        else
        {
            popupReviewsDiv.innerHTML = `
            <div class="none-div">
                <svg xmlns="http://www.w3.org/2000/svg" width="77" height="78" viewBox="0 0 77 78" fill="none">
  <path d="M26.5005 27L50.5005 51M50.5005 27L26.5005 51M74.5005 39C74.5005 58.8824 58.3829 75 38.5005 75C18.6182 75 2.50049 58.8824 2.50049 39C2.50049 19.1178 18.6182 3 38.5005 3C58.3829 3 74.5005 19.1178 74.5005 39Z" stroke="var(--day-dark01)" stroke-opacity="0.5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                Nu exista recenzii
            </div>`
            popupReviewsDiv.classList.add('none');
        }

        assignReviewNum(popupReviewsNum, reviews.length)
        assignReviewNum(reviewReviewsNum, reviews.length)
    }
    addReview(review)
    {
        const currentReviews = JSON.parse(this.getAttribute('reviews'));
        currentReviews.push(review)
        this.setAttribute('reviews', JSON.stringify(currentReviews));
        this.renderReviews();

        // Salvare in main
        for (const sectionName in menuItems)
        {
            const section = menuItems[sectionName];
            if (section)
            {
                const foundItem = section.find(item => item.uid === currentID);

                if (foundItem)
                {
                    // Item found, you can access it as foundItem
                    foundItem.reviews.push(review)
                    break; // Exit the loop since you found the item
                }
            }
        }

        const reviewTextarea = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>textarea')
        deleteTextAnim(reviewTextarea)
        this.starScore = this.calculateStars();

        this.updateStars();

        // Sa se updateze stelele daca pui 0 si schimbi la 3 sa se schimbe si la meniu
        updateMenuSidebar()
    }
    calculateStars()
    {
        const reviews = JSON.parse(this.getAttribute('reviews'));
        let totalStars = 0;

        reviews.forEach(review =>
        {
            totalStars += Number(review.stars);
        });

        return Math.round(totalStars / reviews.length);
    }
    updateStars()
    {
        popupStars.innerText = `${assignStars(this.starScore)}`
        reviewStars.innerText = `${assignStars(this.starScore)}`
        this.shadowRoot.querySelector(':host>.stars').innerText = `${assignStars(this.starScore)}`
    }

}

window.customElements.define("menu-item", MenuItem)

popupButton.addEventListener('click', () =>
{
    const currentItem = itemQuantityMap.get(currentID);


    currentItem.addNumValue();
    if (currentItem.numValue > 0)
    {
        popupItemQuantity.style.display = 'initial'
        popupItemQuantity.textContent = `x ${currentItem.numValue} `
    }
    else
    {
        popupItemQuantity.style.display = 'none'
    }

    if (!sideMenuIDs.includes(currentItem.getAttribute('id')))
    {
        sideMenuIDs.push(currentItem.getAttribute('id'))
    }
    updateMenuSidebar()
})

class SideMenuItem extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
    <style>
        *
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Poppins, Roboto;
            user-select: none;
            z-index: 3;
        }
        :host {
            display: grid;
            grid-template-columns: 80px 1fr;
            width: 100%;
            column-gap: 16px;
            position: relative;
            height: 80px;
        }

        :host>.img {
            width: 100%;
            height: 80px;
            position: relative;
        }

        :host>.img>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }

        :host>.img>.quantity {
            position: absolute;
            top: -8px;
            right: -7px;
            border-radius: 100px;
            background: var(--day-dark02);
            width: 24px;
            height: 24px;
            color: var(--day-white01);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
        }

        :host>.text {
            display: flex;
            flex-direction: column;
            width: 100 %;
        }

        :host>.text>.name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--day-dark01);
            font-size: 20px;
            font-weight: 700;
            white-space: nowrap;
            padding-right: 4px;
            width: 215px;
            text-overflow: ellipsis;
            white-space: now-wrap;
            overflow: hidden;
        }
        :host>.text>.name>span
        {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
        }

        :host>.text>.name>.delete {
            background: none;
            width: 16px;
            height: 16px;
            border: none;
            cursor: pointer;
        }
        :host>.text>.name>.delete>svg
        {
            transition: all 0.15s ease-in-out;
        }
        :host>.text>.name>.delete:hover>svg
        {
            transform: scale(0.85);
        }

        :host>.text>.stars {
            display: flex;
            align-items: center;
            height: 22px;
            color: var(--day-gold);
            font-size: 21px;
            font-weight: 700;
            white-space: nowrap;
        }

        :host>.text>.price {
            color: var(--day-dark03);
            font-size: 20px;
            font-weight: 600;
            margin-top: 2px;
            white-space: nowrap;
        }

      </style>

        <div class="img">
            <div class="quantity">${this.getAttribute('quantity')}</div>
            <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}" draggable="false">
        </div>
        <div class="text">
            <div class="name">
                <span>${this.getAttribute('name')}</span>

                <button class="delete">
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
                ${assignStars(this.getAttribute('stars'))}
            </span>
            <span class="price">${this.getAttribute('price')} MDL</span>
        </div>


`;

        const deleteBttn = this.shadowRoot.querySelector(".delete")
        const ID = this.getAttribute('uid')

        deleteBttn.addEventListener('click', () =>
        {
            const item = itemQuantityMap.get(ID);
            item.numValue = item.numValue - 1
            if (item.numValue <= 0)
            {
                sideMenuIDs = sideMenuIDs.filter(id => id !== ID)
            }

            item.updateNumValue()

            updateMenuSidebar()
        })
    }
}

window.customElements.define("side-menu-item", SideMenuItem)

const reviewTextarea = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>textarea')
const reviewWordsSpan = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>.max>span')

const createReviewStars = document.querySelectorAll(".item-popup>.reviews-side>.content>.create-review>.front>.stars>svg")
const createReviewForm = document.querySelector('.item-popup>.reviews-side>.content>.create-review')

const createReviewBttn = document.querySelector(".item-popup>.reviews-side>.content>.header>button")
const xSVG = document.querySelector('.item-popup>.reviews-side>.content>.header>button>svg')

const reviewsDiv = document.querySelector(".item-popup>.reviews-side>.content>.reviews")
const createReviewDiv = document.querySelector('.item-popup>.reviews-side>.content>.create-review')
const createStarsDiv = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.front>.stars')

let pastTextareaValue = '';
let createReviewStarsFilled = 0;
let starsAreSelected = false;

reviewTextarea.addEventListener('input', (e) =>
{
    if (e.target.value.length <= 500)
    {
        reviewWordsSpan.innerText = `${e.target.value.length}`;
        pastTextareaValue = e.target.value
    }
    else
    {
        e.target.value = pastTextareaValue;
    }
})

createReviewStars.forEach(star =>
{
    star.addEventListener('click', (e) =>
    {
        starsAreSelected = true;
        createReviewStarsFilled = starsAnim(createReviewStars, e.target, ".item-popup>.reviews-side>.content>.create-review>.front>.stars>svg>.fill")
    })
})

createReviewForm.addEventListener('submit', (e) =>
{
    e.preventDefault();

    if (starsAreSelected && reviewTextarea.value !== '')
    {
        // const currentItem = itemQuantityMap.get(currentID);
        const uid = generateMongoLikeID();
        const date = formatDate(new Date());

        // currentItem.addReview({
        //     name: accountName,
        //     date: date,
        //     stars: `${createReviewStarsFilled}`,
        //     description: `${reviewTextarea.value}`,
        //     img: accountImage,
        //     uid: uid
        // })
        resetReviewSlide()
    }
    if (!starsAreSelected)
    {
        createStarsDiv.classList.add('anim')
        setTimeout(() =>
        {
            createStarsDiv.classList.remove('anim')
        }, 350)
    }
    if (reviewTextarea.value == '')
    {
        reviewTextarea.classList.add('anim')
        setTimeout(() =>
        {
            reviewTextarea.classList.remove('anim')
        }, 350)
    }

})

function resetReviewSlide()
{
    reviewWordsSpan.innerText = "0";

    createReviewBttn.classList.remove('active')
    reviewsDiv.classList.add('active');
    createReviewDiv.classList.remove('active');
    xSVG.classList.remove('active')

    createReviewStars.forEach(star =>
    {
        star.querySelector('path.fill').classList.add('not')
    })
    starsAreSelected = false;
    createReviewStarsFilled = 0;
}