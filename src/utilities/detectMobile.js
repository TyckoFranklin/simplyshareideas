
export const isMobile = () => {
    let mobileTest = document.createElement("div");
    mobileTest.className = "mobile-detection-element";
    document.body.appendChild(mobileTest);
    let isMobile = mobileTest.style.display === "none";
    document.body.removeChild(mobileTest);
    return isMobile;
}