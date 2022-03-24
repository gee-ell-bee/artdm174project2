// initializing the init function
document.addEventListener("DOMContentLoaded", init);

//create shortcut vars
let ind = document.querySelector('.index');
let index = 0;

const frame = document.querySelector(".frame");
const slides = frame.querySelectorAll("img");

function init() {

    // shortcut variables
    const back_btn = document.querySelector(".back-btn");
    const next_btn = document.querySelector(".next-btn");

    // if JS is active:
    //hide all images
    slides.forEach((slide) => {
        slide.classList.add("hide");
    });

    //add counter
    ind.innerHTML = `${index + 1} / ${slides.length}`;

    // show the first slide
    slides[0].classList.remove("hide");

    // button event listeners
    next_btn.addEventListener("click", changeSlide);
    back_btn.addEventListener("click", changeSlide);
}

function changeSlide(e) {

    // stop link from trying to reload page
    e.preventDefault();

    // shortcut vars
    let showing = document.querySelector(".current");
    let nextUp = "";


    // actions taken for NEXT button
    if (e.target.className == "next-btn") {

        // current image class lists
        let currentClass = showing.classList;

        // reset current image's class lists
        resetCurrentClasses(currentClass);
        resetNextClasses(currentClass);

        // current image animation
        currentClass.toggle("swipeNextCurrent");

        // initial nextUp & index value changes
        nextUp = showing.nextElementSibling;
        index = index + 1;

        // "looping" slides
        if (index > slides.length - 1) {
            index = 0;
            nextUp = slides[0];
        }

        // making sure next image is there
        if (nextUp.nodeName !== "IMG") {
            nextUp = slides[0];
        }

        // matching new index number to page text
        ind.innerHTML = `${index + 1} / ${slides.length}`;


        // next image class lists
        let nextClass = nextUp.classList;

        //reset next image's class lists
        resetNextClasses(nextClass);
        resetCurrentClasses(nextClass);

        // next image animation
        nextUp.classList.toggle("swipeNextNext");

        // reset classlists
        //showing.classList.toggle("swipeNextCurrent");
        //nextUp.classList.toggle("swipeNextNext");
    }

    // actions taken for BACK button
    if (e.target.className == "back-btn") {

        // current image class lists
        let currentClass = showing.classList;

        // reset current image's class lists
        resetCurrentClasses(currentClass);
        resetNextClasses(currentClass);

        // current image animation
        showing.classList.toggle("swipeBackCurrent");

        // initial nextUp & index value changes
        nextUp = showing.previousElementSibling;
        index = index - 1;

        // "looping" slides
        if (index < 0) {
            index = slides.length - 1;
            nextUp = slides[slides.length - 1];
        }

        // making sure next image is there
        if (nextUp.nodeName !== "IMG") {
            nextUp = slides[slides.length - 1];
        }

        // matching new index number to page text
        ind.innerHTML = `${index + 1} / ${slides.length}`;

        // next image class lists
        let nextClass = nextUp.classList;

        //reset next image's class lists
        resetNextClasses(nextClass);
        resetCurrentClasses(nextClass);

        // next image animation
        nextUp.classList.add("swipeBackNext");

        // reset classlists
        //showing.classList.toggle("swipeBackCurrent");
        //nextUp.classList.toggle("swipeBackNext");

    }

    // activate next image
    nextUp.classList.toggle("hide");
    showing.classList.toggle("current");
    nextUp.classList.toggle("current");

    // deactivate current image
    showing.addEventListener("animationend", () => {
        showing.classList.toggle("hide");
    });
    
}

// to reset the current image's classes before starting a new animation
function resetCurrentClasses(classList) {

    //removing current image's "next" animation
    if(classList.contains("swipeNextCurrent")) {
        classList.remove("swipeNextCurrent");
    }

    //removing current image's "back" animation
    if(classList.contains("swipeBackCurrent")) {
        classList.remove("swipeBackCurrent");
    }
}

function resetNextClasses(classList) {

    //removing next image's "next" animation
    if(classList.contains("swipeNextNext")) {
        classList.remove("swipeNextNext");
    }

    //removing next image's "back" animation
    if(classList.contains("swipeBackNext")) {
        classList.remove("swipeBackNext");
    }
}