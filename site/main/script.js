window.onload = () => {
    let selecter = document.getElementById("BaseURL")
    let timeout = document.getElementById("timeout")
    let redirectURL = document.getElementById("RedirectURL")
    let UrlInHTML = document.getElementById("url-in-html")

    function ChengeURL(event) {
        let parms = {}
        if (timeout.value !== "") parms["timeout"] = timeout.value
        if (redirectURL.value !== "") parms["redirect"] = redirectURL.value
        if (UrlInHTML.value !== "") parms["html"] = UrlInHTML.value
        document.getElementById("url").textContent = `https://push-loader.com${selecter.value}?${new URLSearchParams(parms).toString()}`
    }

    timeout.addEventListener("keyup", ChengeURL)
    redirectURL.addEventListener("keyup", ChengeURL)
    UrlInHTML.addEventListener("keyup", ChengeURL)

    selecter.addEventListener("change", event => {
        let parms = document.getElementsByClassName("parms")
        document.getElementById("url").textContent = `https://push-loader.com${selecter.value}`
        if (selecter.value === "/") {
            for (let i = 0; i < parms.length; i++) parms[i].style.display = "none" 
        } else {
            for (let i = 0; i < parms.length; i++) parms[i].style.display = "block"
        }
    })
}