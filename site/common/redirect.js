window.onload = () => {
    let interval = 5000
    let parms = new URLSearchParams(document.location.search)

    if (parms.get("html") !== null) {
        let object = document.createElement("a")
        object.href = parms.get("html")
        object.textContent = "Click this and Reload"
        object.classList.add("info")
        object.id = "RedirectLINK"
        object.style.fontSize = "30px"
        document.getElementById("text").after(object)
    }

    if (parms.get("redirect") !== null) {
        if (parms.get("timeout") !== null) interval = Number(parms.get("timeout"))
        setTimeout(() => {
            location.href = parms.get("redirect")
        }, interval);
    }
}