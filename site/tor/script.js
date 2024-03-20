let body = document.querySelector("body")
setInterval(() => {
    (body.style.backgroundColor === "red")? body.style.backgroundColor = "blue" : body.style.backgroundColor = "red"
}, 100);