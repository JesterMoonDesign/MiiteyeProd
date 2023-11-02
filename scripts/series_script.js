"use strict"

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function headerInnerMenu () {
    const mobileBtn = document.getElementById('pcBtn');
    const innerMenu = document.getElementById('seriesHeader');
    const arrow = document.getElementById('galleryMenuArrow');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
    }));
};

function mobileHeaderInnerMenu () {
    const mobileBtn = document.getElementById('mobileBtn');
    const innerMenu = document.getElementById('mobileHeaderMenu');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
    }));
};

if(isMobile.any()) {
    mobileHeaderInnerMenu();
} else {
    headerInnerMenu();
};

const sliders = document.getElementsByClassName('imagesRow');

window.onload = function () {
    document.body.style.pointerEvents = 'none';
}

window.onload = setTimeout(deleteAnim, 3000)

function deleteAnim () {
    sliders[0].style.animation = "none";
    sliders[0].style.webkitAnimation = "none";
    sliders[0].style.mozAnimation = "none";
    sliders[0].style.opacity = "1";
    sliders[0].style.transform = "translateX(0px)";
    sliders[0].style.webkitTransform = "translateX(0px)";
    sliders[0].style.mozTransform = "translateX(0px)";
    console.log('loaded');
    sliders[0].style.animation = "scrollAnim 1s ease-in-out 1s";
    sliders[0].style.webkitAnimation = "scrollAnim 1s ease-in-out 1s";
    sliders[0].style.mozAnimation = "scrollAnim 1s ease-in-out 1s";

    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        // xData.slider = slider;
        let timeout = setTimeout(() => {
            slider.style.animation = "none";
            slider.style.opacity = "1";
            slider.style.transform = "translateX(0px)";
            slider.style.webkitTransform = "translateX(0px)";
            slider.style.mozTransform = "translateX(0px)";
            document.body.style.pointerEvents = 'auto';
            clearTimeout(timeout);
        }, 2000);
    }
}

let mobileIndex;

if(isMobile.any()) {
    mobileIndex = 1;
} else {
    mobileIndex = 3;
};



// let sliderWrappers = document.getElementsByClassName('sliderWrapper');
// const image = document.getElementsByClassName('sliderImageWrapper');
// let imageWidth = parseInt(getComputedStyle(image[0]).width);
// let xData = {};
// let y = mobileIndex;
// let slidersLength = {};


// function startSlide (event) {
//     event.preventDefault();

//     xData.sliderWrapper = this;
//     let slider = this.childNodes[1];
//     xData.slider = slider;

//     let matrex = window.getComputedStyle(slider).getPropertyValue("transform");
//     let matrexArr = matrex.split(", ");
//     xData.x0 = parseInt(matrexArr[4]);
//     xData.e1 = xData.x0;
//     console.log('x0_' + xData.x0, 'e1_'+xData.e1)
    
//     xData.x1 = event.layerX;

//     slidersLength = this.getElementsByClassName('sliderImageWrapper');
    
//     this.style.pointerEvents="none";
//     this.setPointerCapture(event.pointerId);
//     this.ondragstart = () => false;

//     this.onpointermove = moveSLide;
//     this.onpointercancel = endSlide;
//     this.onpointerleave = endSlide;
// }

// function moveSLide (event) {
//     x = event.layerX - xData.x1;
//     xData.slider.style.transform = "translateX(" + x + 'px)';
// }

// function endSlide () {
    
//     let slider = xData.slider;

//     function getX0 () {
//         let matrex = window.getComputedStyle(slider).getPropertyValue("transform");
//         let matrexArr = matrex.split(", ");
//         xData.x0 = parseInt(matrexArr[4]);
//     }getX0 ();
//     console.log('x0_' + xData.x0, 'e1_'+xData.e1)


//     if (xData.x0 < xData.e1 && xData.x0-xData.e1 < (-0.5*imageWidth) && y < slidersLength) {
//         if (y>=slidersLength) {
//             y=slidersLength;
//         } else if (y<slidersLength) {
//             y++;
//             if (xData.x0-xData.e1 < (-1.5*imageWidth)) {
//                 y++;
//                 if (xData.x0-xData.e1 < (-2.5*imageWidth)) {
//                     y++;
//                 }
//             }
//         };
//     } else if (y>mobileIndex && xData.x0 > e1 && xData.x0-xData.e1 > (0.5*imageWidth)) {
//         if (y<=mobileIndex) {
//             y=mobileIndex;
//         } else {
//             y--;
//             if (xData.x0-xData.e1 > (1.5*imageWidth)) {
//                 y--;
//                 if (xData.x0-xData.e1 > (2.5*imageWidth)) {
//                     y--;
//                 }
//             }
//         }
//     };
//     if (y>=slidersLength) {
//         y=slidersLength;
//     }
//     if (y<=mobileIndex) {
//         y=mobileIndex;
//     };
//     if (y>mobileIndex && y <= slidersLength) {
//         xData.slider.style.transform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//         xData.slider.style.webkitTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//         xData.slider.style.mozTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//     } else if (y==mobileIndex) {
//         xData.slider.style.transform = "translateX(0px)";
//         xData.slider.style.webkitTransform = "translateX(0px)";
//         xData.slider.style.mozTransform = "translateX(0px)";
//     }
//     getX0 ();
//     console.log('x0_' + xData.x0, 'e1_'+xData.e1)
//     xData.sliderWrapper.onpointermove = null;
//     xData.sliderWrapper.onpointerup = null;
//     xData.sliderWrapper.style.pointerEvents="auto";
// };

// for (const sliderWrapper of sliderWrappers) {
//     sliderWrapper.onpointerdown = startSlide;
//     sliderWrapper.onpointerup = endSlide;
// }






// function seriesSliders () {
//     let sliderWrappers = document.getElementsByClassName('sliderWrapper');
//     const image = document.getElementsByClassName('sliderImageWrapper');
//     let imageWidth = parseInt(getComputedStyle(image[0]).width);
//     let xData = {};
//     let y = mobileIndex;
//     let x1 = 0;
//     let x2 = 0;


    
//     for(let i = 0; i < sliderWrappers.length; i++) {
    
//         function getX0 () {
//             let matrex = window.getComputedStyle(sliders[i]).getPropertyValue("transform");
//             let matrexArr = matrex.split(", ");
//             xData.x0 = parseInt(matrexArr[4]);
//         }getX0();


//         sliderWrappers[i].onpointerdown = function (event) {
//             event.preventDefault();

//             let pagePosition = window.scrollY;
//             document.body.classList.add('disable-scroll');
//             xData.pageX = pagePosition;
//             document.body.style.top = -pagePosition + 'px';
//             sliderWrappers[i].style.touchAction = "none";

//             sliderWrappers[i].setPointerCapture(event.pointerId);


//             let slidersLength = sliders[i].getElementsByClassName('sliderImageWrapper').length;
//             let e1 = xData.x0;
//             let e2 = 0;
//             x1 = event.offsetX;
            
//             if (document.body.classList.contains('disable-scroll')) {
//                 sliderWrappers[i].onpointermove = sliderMove;
//             } else {
//                 sliderWrappers[i].onpointermove = null;
//             }
            
//             function sliderMove (event) {
//                 x2 = event.offsetX;
//                 let x = x2 - x1;
//                 sliders[i].style.transform = "translateX(" + x + 'px)';
//                 sliders[i].style.webkitTransform = "translateX(" + x + 'px)';
//                 sliders[i].style.mozTransform = "translateX(" + x + 'px)';
//             }

//             function endSlide () {
//                 getX0 ();
//                 e2 = xData.x0;
//                 if (e2 < e1 && e2-e1 < (-0.5*imageWidth) && y < slidersLength) {
//                     if (y>=slidersLength) {
//                         y=slidersLength;
//                     } else if (y<slidersLength) {
//                         y++;
//                         if (e2-e1 < (-1.5*imageWidth)) {
//                             y++;
//                             if (e2-e1 < (-2.5*imageWidth)) {
//                                 y++;
//                             }
//                         }
//                     };
//                 } else if (y>mobileIndex && e2 > e1 && e2-e1 > (0.5*imageWidth)) {
//                     if (y<=mobileIndex) {
//                         y=mobileIndex;
//                     } else {
//                         y--;
//                         if (e2-e1 > (1.5*imageWidth)) {
//                             y--;
//                             if (e2-e1 > (2.5*imageWidth)) {
//                                 y--;
//                             }
//                         }
//                     }
//                 };
//                 if (y>=slidersLength) {
//                     y=slidersLength;
//                 }
//                 if (y<=mobileIndex) {
//                     y=mobileIndex;
//                 };
//                 if (y>mobileIndex && y <= slidersLength) {
//                     sliders[i].style.transform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//                     sliders[i].style.webkitTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//                     sliders[i].style.mozTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
//                 } else if (y==mobileIndex) {
//                     sliders[i].style.transform = "translateX(0px)";
//                     sliders[i].style.webkitTransform = "translateX(0px)";
//                     sliders[i].style.mozTransform = "translateX(0px)";
//                 }
//                 getX0 ();
                
//                 pagePosition = xData.pageX;
//                 document.body.style.top = 'auto';
//                 window.scroll({ top: pagePosition, left: 0 });
//                 document.body.classList.remove('disable-scroll');
//                 sliderWrappers[i].style.touchAction = "auto";
                
//                 sliderWrappers[i].onpointermove = null;
//                 sliderWrappers[i].onpointerup = null;
//                 sliderWrappers[i].onpointercancel = null;
//                 sliderWrappers[i].onpointerleave = null;
                
//             };
//             sliderWrappers[i].onpointerup = endSlide;
//             sliderWrappers[i].onpointercancel = endSlide;
//             sliderWrappers[i].onpointerleave = endSlide;
//             sliderWrappers[i].onpointerleave = console.log('leave');
//             sliderWrappers[i].onpointercancel = console.log('cancel');
//             sliderWrappers[i].ondragstart = () => false;
//             sliders[i].ondragstart = () => false;
//         }
//     }
// }seriesSliders ();


let sliderWrappers = document.getElementsByClassName('sliderWrapper');
let xData = [];
let x1;
let y = mobileIndex;

for(let i = 0; i < sliderWrappers.length; i++) {
    sliderWrappers[i].addEventListener('pointerdown', slider);
    sliderWrappers[i].ondragstart = () => false;
    sliderWrappers[i].dataset.index = y;
}

function slider (event) {
    event.preventDefault();
    let currentSlider = event.target;
    let currentRow = event.target.firstElementChild;
    let x;
    let slidersLength = currentRow.children.length;
    let imageWidth = parseInt(getComputedStyle(currentRow.children[0]).width);

    function getX0 () {
        let matrex = window.getComputedStyle(currentRow).getPropertyValue("transform");
        let matrexArr = matrex.split(", ");
        xData.x0 = parseInt(matrexArr[4]);
    }getX0();


    currentSlider.setPointerCapture(event.pointerId);

    x1 = event.layerX + Math.abs(xData.x0);

    currentSlider.onpointermove = moveSlide;
    
    function moveSlide (event) {
        event.preventDefault();

        xData.x2=event.layerX;

        x = event.layerX - x1;

        currentRow.style.transform =  "translateX(" + x + "px)";
        currentRow.style.webkitTransform =  "translateX(" + x + "px)";
        currentRow.style.mozTransform =  "translateX(" + x + "px)";
    }

    currentSlider.onpointerup = endSlide;
    currentSlider.onpointerleave = endSlide;
    currentSlider.onpointercancel = endSlide;

    function endSlide () {

        y = currentSlider.getAttribute("data-index");

        let e1 = Math.abs(xData.x0);
        getX0 ();
        let e2 = Math.abs(xData.x0);

        if (y>=mobileIndex && e2 > e1 && e2-e1 > (0.5*imageWidth)) {
            if (y>=slidersLength) {
                y=slidersLength;
            } else if (xData.x0<0) {
                y++;
                if (e2-e1 > (1.5*imageWidth)) {
                    y++;
                    if (e2-e1 > (2.5*imageWidth)) {
                        y++;
                    }
                }
            };
        } else if (y>mobileIndex && e2 < e1 && e2-e1 < (-0.5*imageWidth)) {
            if (y<=mobileIndex) {
                y=mobileIndex;
            } else {
                y--;
                if (e2-e1 < (-1.5*imageWidth)) {
                    y--;
                    if (e2-e1 < (-2.5*imageWidth)) {
                        y--;
                    }
                }
            }
        };

        if (y>=slidersLength) {
            y=slidersLength;
        }
        if (y<=mobileIndex) {
            y=mobileIndex;
        };

        if (y>mobileIndex && y <= slidersLength) {
            currentRow.style.transform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
            currentRow.style.webkitTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
            currentRow.style.mozTransform = "translateX(" + ((y-mobileIndex)*-imageWidth-(y-mobileIndex)*20) + "px)";
        } else if (y===mobileIndex) {
            currentRow.style.transform = "translateX(0px)";
            currentRow.style.webkitTransform = "translateX(0px)";
            currentRow.style.mozTransform = "translateX(0px)";
        }
        getX0 ();
        currentSlider.dataset.index = y;

        currentSlider.onpointermove = null;
        currentSlider.onpointerup = null;
        currentSlider.onpointercancel = null;
        currentSlider.onpointerleave = null;
    }
};