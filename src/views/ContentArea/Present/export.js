export const exportCSS = `
<style type="text/css">
html {
    background-color: #171717;
    text-align: center;
}

body .overlay {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: black;
    color: rgb(195, 221, 79);
    overflow: hidden;
    overflow-y: hidden;
    margin-bottom: 3rem;
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