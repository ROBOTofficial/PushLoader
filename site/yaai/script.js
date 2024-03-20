let body = document.querySelector("body")
setInterval(() => {
    if (body.style.backgroundColor === "white") {
        body.style.backgroundColor = "black"
        ChengeTEXT("white")
    } else {
        body.style.backgroundColor = "white"
        ChengeTEXT("black")
    }
}, 500);
function ChengeTEXT(color) {
    let texts = document.getElementsByClassName("text")
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.color = color
    }
}