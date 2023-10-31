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