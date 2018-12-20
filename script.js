var bubblingModeEnable = false;

var isMenuOpenned = false;

var menuOpenned;

var closerFavElem;

function openMenu(elem){
    if(elem.children.length > 1){
        if(isMenuOpenned){
            let child = elem.children;
            for(let i = 0; i < child.length; i++){
                let tableChild = child[i];
                tableChild.removeAttribute('style');
            }
            isMenuOpenned  = false;
        }
        else{
            let child = elem.children;
            for(let i = 0; i < child.length; i++){
                let tableChild = child[i];
                tableChild.style.display = 'block';
            }
            isMenuOpenned = true;
            menuOpenned = elem;
        }
    }
}

function offset(el) {
    let rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (offset(elem).left+(elem.offsetWidth/2)), 2) + Math.pow(mouseY - (offset(elem).top+(elem.offsetHeight/2)), 2)));
}

function calculateCloserFavElement(mouseX,mouseY){
    if(bubblingModeEnable){
        let favElem = document.getElementsByClassName("fav");
        let distancies = [];
        for (let i = 0; i < favElem.length; i++) {
            distancies[i] = calculateDistance(favElem[i],mouseX,mouseY);
            favElem[i].classList.remove("isClose");
        }
        let closerElemIndex = 0;
        for(let i = 0; i < distancies.length; i++) {
            if (distancies[i] < distancies[closerElemIndex]){
                closerElemIndex = i;
            }
        }
        closerFavElem = favElem[closerElemIndex];
        closerFavElem.classList.add("isClose");
    }
}

function setCanva() {
    document.getElementById("canva").setAttribute('width',window.innerWidth);
    document.getElementById("canva").setAttribute('height',window.innerHeight);
}

function mouseMoving(e) {
    let canva = document.getElementById('canva');
    calculateCloserFavElement(e.clientX,e.clientY);
    if (bubblingModeEnable) {
        canva = document.getElementById('canva');
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let context = canva.getContext('2d');
        context.clearRect(0, 0, canva.width, canva.height);
        context.beginPath();
        let favMenu = closerFavElem;
        let dist = calculateDistance(favMenu, mouseX, mouseY);
        context.arc(mouseX, mouseY, dist, 0, 2 * Math.PI, true);
        context.fillStyle = "#006400";
        context.fill();
    }
}

function mouseClicked(e) {
    if(bubblingModeEnable){
        openMenu(closerFavElem);
    }
}

function endingBubbleMenu(){
    let navBar = document.getElementsByClassName("navbar")[0];
    let childrens = navBar.children;
    for(let i = 0; i<childrens.length; i++) {
        childrens[i].classList.remove("isClose");
    }
    if(isMenuOpenned){
        openMenu(menuOpenned);
    }
}

document.onkeydown = function (e) {
    if(e.key == 'Control'){
        bubblingModeEnable = true;
    }
}

document.onkeyup = function (e) {
    if(e.key == 'Control') {
        bubblingModeEnable = false;
        canva = document.getElementById('canva');
        context = canva.getContext('2d')
        context.clearRect(0,0,canva.width,canva.height);
        endingBubbleMenu();
    }
}

document.onmousemove = function (ev) {
    mouseMoving(ev);
}

document.onmousedown = function (ev) {
    mouseClicked(ev);
}