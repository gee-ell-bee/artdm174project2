// initializing the init function
document.addEventListener("DOMContentLoaded", init);

//create shortcut vars
let ind = document.querySelector('.index');
let index = 0;

const frame = document.querySelector(".frame");
const slides = frame.querySelectorAll("img");


// FUNCTIONS

function init() {

    // shortcut variables
    const backBtn = document.querySelector(".backBtn");
    const nextBtn = document.querySelector(".nextBtn");

    // if JS is active:
    //hide all images
    slides.forEach((slide) => {
        slide.classList.add("hide");
    });

    //reveal buttons
    backBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");

    //add styles to frame
    frame.classList.add("frameJs");

    //add counter
    ind.innerHTML = `${index + 1} / ${slides.length}`;

    //show the first slide
    slides[0].classList.toggle("hide");

    //button event listeners
    nextBtn.addEventListener("click", changeSlide);
    backBtn.addEventListener("click", changeSlide);
}


function changeSlide(e) {

    // stop link from trying to reload page
    e.preventDefault();

    // shortcut vars
    let showing = document.querySelector(".current");
    let nextUp = "";

    // actions taken for NEXT button
    if (e.target.className == "nextBtn") {

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
    }

    // actions taken for BACK button
    if (e.target.className == "backBtn") {

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
    }

    // matching new index number to page text
    ind.innerHTML = `${index + 1} / ${slides.length}`;

    // creating variables that match "if" cases
    let showingClass = showing.classList;
    let nextClass = nextUp.classList;
    const once = {
        once : true
    };


    // current image animation
    showingClass.toggle("current");
    showingClass.toggle("fadeOut");

    // deactivate current image & activate next image listener
    showing.addEventListener("animationend", () => {
        showingClass.toggle("hide");
        showingClass.toggle("fadeOut");

        // activate next image
        nextClass.toggle("hide");
        nextClass.toggle("current");
    }, once);
}