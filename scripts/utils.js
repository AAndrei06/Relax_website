export function lockScroll()
{
    let xPos = window.scrollX;
    let yPos = window.scrollY;
    window.onscroll = () => window.scroll(xPos, yPos);
}
export function unlockScroll()
{
    window.onscroll = "";
}

export function deleteTextAnim(input)
{
    let time = 5;

    if (input.value.length < 50)
    {
        time = 10;
    }

    let interval = setInterval(() =>
    {
        if (input.value.length > 0)
        {
            input.value = input.value.slice(0, -1);
        }
        else
        {
            clearInterval(interval);
        }
    }, time);
}
export function assignStars(starsNum)
{
    if (starsNum && starsNum !== 'NaN')
    {
        starsNum = Math.min(Math.max(starsNum, 0), 5);

        const starsString = '★ '.repeat(starsNum) + '☆ '.repeat(5 - starsNum);
        return starsString;
    }
    else
    {
        return '☆ ☆ ☆ ☆ ☆';
    }
}
export function starsAnim(stars, star, path)
{
    const indexClicked = Array.from(stars).indexOf(star);

    const fullPath = `${path}:not(.not)`

    const starsFilled = document.querySelectorAll(fullPath).length;

    if (indexClicked >= 0 && indexClicked < stars.length)
    {
        if (indexClicked + 1 <= starsFilled)
        {
            for (let i = indexClicked + 1; i < stars.length; i++)
            {
                stars[i].children[2].classList.add('not');
            }
        }
        else
        {
            for (let i = 0; i < indexClicked + 1; i++)
            {
                stars[i].children[2].classList.remove('not');
            }
        }
    }

    return indexClicked + 1;

}

export function loadingAnim(button)
{
    const loading = button.querySelector(".loading");
    const text = button.querySelector(".text");

    button.style.pointerEvents = 'none';

    text.innerText = ''
    loading.style.opacity = "1"
}

export function responseAnim(err = false, button, msg)
{
    const loading = button.querySelector(".loading")
    const text = button.querySelector(".text")
    const feedback = button.querySelector('.feedback')

    if (err)
    {
        feedback.style.background = '#EF5B5B'
        feedback.textContent = "Eroare"
    } else
    {
        feedback.style.background = '#799f82'
        feedback.textContent = "Succes"
    }
    loading.style.opacity = "0"

    setTimeout(() =>
    {
        text.innerText = msg
    }, 250)

    feedback.style.transform = "translateX(0%)"
    feedback.style.opacity = "1"
}

export function endAnim(button)
{
    const feedback = button.querySelector('.feedback')

    feedback.style.transform = "translateX(100%)"
    setTimeout(() =>
    {
        feedback.style.opacity = "0"
        feedback.style.transform = "translateX(-100%)"
    }, 250);

    button.style.pointerEvents = 'initial';
}

export function generateMongoLikeID()
{
    const timestamp = Math.floor(Date.now() / 1000)
        .toString(16)
        .padStart(8, "0");
    const machineIdentifier = Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
    const processIdentifier = Math.floor(Math.random() * 65536)
        .toString(16)
        .padStart(4, "0");
    const randomValue1 = Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
    const randomValue2 = Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");

    const mongoLikeID = `temporary${timestamp}${machineIdentifier}${processIdentifier}${randomValue1}${randomValue2}`;

    return mongoLikeID;
}

export function formatDate(date)
{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const romanianDate = date.toLocaleDateString('ro-RO', options);

    return romanianDate;
}

export function displayImage(file, img)
{
    var reader = new FileReader();

    reader.onload = function (e)
    {
        img.src = e.target.result;
    };

    // Read the image file as a data URL
    reader.readAsDataURL(file);
}
export function focusItem(div)
{
    const range = document.createRange();
    range.selectNodeContents(div);
    const selection = window.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);
}