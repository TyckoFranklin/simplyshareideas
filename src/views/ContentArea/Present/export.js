export const scrollJavaScript = `
<script>
window.slides = document.querySelectorAll(".overlay")
window.slides[0].style.zIndex = 3;
window.currentSlide = 0;
let isFullScreen = false;
document.querySelector("html").addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        window.slides[window.currentSlide].style.zIndex = 1;
        window.currentSlide = window.currentSlide === 0 ? window.slides.length - 1 : window.currentSlide - 1;
        window.slides[window.currentSlide].style.zIndex = 3;
        // window.slides[window.currentSlide].scrollIntoView();

    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        window.slides[window.currentSlide].style.zIndex = 1;
        window.currentSlide = window.currentSlide === window.slides.length - 1 ? 0 : window.currentSlide + 1;
        window.slides[window.currentSlide].style.zIndex = 3;
        // window.slides[window.currentSlide].scrollIntoView();
    } else if (e.key === "+") {
        e.preventDefault();
        handleIncreaseSize()
    } else if (e.key === "-") {
        e.preventDefault();
        handleDecreaseSize()
    } else if (e.key === "Escape") {
        isFullScreen = false;
    } else if (e.key === "Enter") {
        e.preventDefault();
        if(isFullScreen){
            document.exitFullscreen();
            isFullScreen = false;
        } else {
            document.body.requestFullscreen();
            isFullScreen = true;
        }
    }
});
document.querySelector("html").style.fontSize = "16px";
var handleIncreaseSize = () => {
    let html = document.querySelector("html");
    let fontSize = html.style.fontSize.replace(/\\D/g, "");
    fontSize = fontSize === "" ? "16px" : (+fontSize + 2) + "px";
    html.style.fontSize = fontSize;
    window.slides[window.currentSlide].scrollIntoView();
}

var handleDecreaseSize = () => {
    let html = document.querySelector("html");
    let fontSize = html.style.fontSize.replace(/\\D/g, "");
    console.log(fontSize);
    fontSize = fontSize === "" ? 16 : +fontSize - 2;
    fontSize = fontSize < 1 ? 2 : fontSize;
    html.style.fontSize = fontSize + "px";
    window.slides[window.currentSlide].scrollIntoView();
}
let increases = document.querySelectorAll(".slide-control-option.increase");
increases.forEach((increase) => {
    increase.addEventListener("click", () => handleIncreaseSize())
    increase.addEventListener("touchstart", () => handleIncreaseSize())
})
let decreases = document.querySelectorAll(".slide-control-option.decrease");
decreases.forEach((decrease) => {
    decrease.addEventListener("click", () => handleDecreaseSize())
    decrease.addEventListener("touchstart", () => handleDecreaseSize())
})
</script>

`

export const exportCSS = `
<style type="text/css">
html {
    background-color: #171717;
    text-align: center;
}

body {
    margin: 0px;
}

body .overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    color: rgb(195, 221, 79);
    overflow: hidden;
    overflow-y: hidden;
    /* margin-bottom: 3rem; */
    z-index:1;
}

.overlay .display-area {
    width: 70%;
    height: 100%;
    top:0%;
    right:15%;
    position: absolute;
    margin: auto;
}

.overlay .display-area img {
    width: 100%;
}

.overlay .slide-info {
    color: white;
    font-size: 1rem;
    left: 1rem;
    top: 1rem;
    position: absolute;
}

.overlay .slide-control {
    color: white;
    font-size: 16px;
    right: 0px;
    top: 0px;
    position: absolute;
    opacity: 0;
}

.overlay .slide-control.show {
    opacity: 1;
}

.overlay .slide-control:hover {
    opacity: 1;
}
.overlay .slide-control:active {
    opacity: 1;
}

.overlay .slide-control-option {
    display: inline-block;
    margin: 16px;
    height: 16px;
    cursor: pointer;
}

.overlay .slide-control-toggle {
    opacity: 1;
}

.overlay display-container-export {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}

.overlay h1 {
    font-size: 6rem;
}

.overlay h2 {
    font-size: 5rem;
}

.overlay h3 {
    font-size: 4rem;
}

.overlay h4 {
    font-size: 3rem;
}

.overlay h5 {
    font-size: 2rem;
}

.overlay ul {
    font-size: 2rem;
    width: fit-content;
    text-align: left;
}

.overlay li {
    margin: 4rem 0px;
}
</style>
`