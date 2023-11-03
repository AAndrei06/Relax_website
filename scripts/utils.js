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
    starsNum = Math.min(Math.max(starsNum, 0), 5);

    const starsString = '★ '.repeat(starsNum) + '☆ '.repeat(5 - starsNum);

    return starsString;
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
    const loading = button.querySelector(".loading")
    const text = button.querySelector(".text")

    text.innerText = ''
    loading.style.opacity = "1"
}
export function responseAnim(res)
{
    if (res)
    {
        setTimeout(() =>
        {
            text.innerText = 'Trimite'
            loading.style.opacity = "0"
        }, 250)
    }

    sendBttnFeedback.style.transform = "translateX(0%)"
    sendBttnFeedback.style.opacity = "1"
    setTimeout(() =>
    {
        sendBttnFeedback.style.transform = "translateX(100%)"
        setTimeout(() =>
        {
            sendBttnFeedback.style.opacity = "0"
            sendBttnFeedback.style.transform = "translateX(-100%)"
        }, 250);
    }, 2000)

}   