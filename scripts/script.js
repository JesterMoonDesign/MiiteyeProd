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

let section1 = document.getElementsByClassName('index-section-1');
let section2 = document.getElementsByClassName('index-section-2');
let section3 = document.getElementsByClassName('index-section-3');
let scrollAnimate = document.getElementsByClassName('scrollAnimate');
let logo = document.getElementsByClassName('logo');
const header = document.getElementById('indexHeader');
let y = 0;
let mobIndex = 1;
let moveIndex = 1;

if(isMobile.any()) {
    mobIndex = 1;
    moveIndex = 5;
} else {
    mobIndex = 20;
    moveIndex = 1;
};

function isGallery () {
    let key = localStorage.getItem('whereGo?');
    if (key == 'gallery') {
        section1[0].classList.remove("active");
        section2[0].classList.remove("active");
        section3[0].classList.add("active");
        logo[0].classList.remove("section2");
        logo[0].classList.add("active");
        logo[0].classList.add("section3");
    }
    localStorage.clear();
}isGallery ();

function goToSection2 (event) {
    event.preventDefault();
    document.body.setPointerCapture(event.pointerId);

    let x = event.screenX;
    event.preventDefault();

    document.body.onpointermove = function (event) {
        event.preventDefault();
        y = event.screenX;
        document.body.onpointerup = function () {
            event.preventDefault();

            if (section1[0].classList.contains('active') && x-y>(5*mobIndex)) {
                let index = 30;

                let transitionToSection2 = setInterval(() => {
                    index+=moveIndex;
                    section1[0].style.transform = 'translateX(-' + index + '%)';
                    section1[0].style.webkitTransform = 'translateX(-' + index + '%)';
                    section1[0].style.mozTransform = 'translateX(-' + index + '%)';
                    section2[0].style.transform = 'translateX(0%)';
                    section2[0].style.webkitTransform = 'translateX(0%)';
                    section2[0].style.mozTransform = 'translateX(0%)';

                    if (index >= 100){
                        logo[0].classList.add("active");
                        clearInterval(transitionToSection2);
                        section1[0].classList.remove("active");
                        section2[0].style.display = "flex";

                        let logoAnimStep1 = setTimeout(() => {
                            logo[0].classList.add("section2");
                            section2[0].classList.add("active");
                            section1[0].style.display = "none";
                            clearTimeout(logoAnimStep1);
                        }, 1500);
                    };
                }, 4);
            }
            document.body.removeEventListener('pointerdown', goToSection2)
            document.body.onpointermove = null;
            document.body.onpointerup = null;
        }
    }
}

function goToSection3 (event) {
    event.preventDefault();
    document.body.setPointerCapture(event.pointerId);
    let x = event.screenX;

    document.body.onpointermove = function (event) {
        event.preventDefault();
        y = event.screenX;

        document.body.onpointerup = function () {
            event.preventDefault();

            if (section2[0].classList.contains('active') && x-y<=-(5*mobIndex) && !(section1[0].classList.contains('active'))) {
                let index = 30;

                let transitionToSection1 = setInterval(() => {
                    index+=moveIndex;
                    section2[0].style.transform = 'translateX(' + index + '%)';
                    section2[0].style.webkitTransform = 'translateX(' + index + '%)';
                    section2[0].style.mozTransform = 'translateX(' + index + '%)';
                    let reverseIndex = index - (100 + moveIndex);
                    section1[0].style.transform = 'translateX(' + reverseIndex + '%)';
                    section1[0].style.webkitTransform = 'translateX(' + reverseIndex + '%)';
                    section1[0].style.mozTransform = 'translateX(' + reverseIndex + '%)';

                    if (reverseIndex == 0){
                        section2[0].classList.remove("active");
                        section3[0].classList.remove("active");
                        section1[0].classList.add("active");
                        section1[0].style.display = "flex";
                        logo[0].classList.remove("section2");
                        logo[0].classList.remove("section3");
                        logo[0].classList.remove("active");
                        clearInterval(transitionToSection1);

                        let logoAnimStep1 = setTimeout(() => {
                            section2[0].style.display = "none";
                            section3[0].style.display = "none";
                            clearTimeout(logoAnimStep1);
                        }, 50);
                    };
                }, 4);
            } else {
                if (section2[0].classList.contains('active')  && x-y>=(5*mobIndex) && !(section3[0].classList.contains('active'))) {
                    let index = 30;
    
                    let transitionToSection3 = setInterval(() => {
                        index+=moveIndex;
                        section2[0].style.transform = 'translateX(-' + index + '%)';
                        section2[0].style.webkitTransform = 'translateX(-' + index + '%)';
                        section2[0].style.mozTransform = 'translateX(-' + index + '%)';
    
                        if (index >= 100){
                            clearInterval(transitionToSection3);
                            section2[0].classList.remove("active");
                            logo[0].classList.remove("section2");
                            logo[0].classList.add("section3");
                            section3[0].classList.add("active");
                            section3[0].style.display = "block";
    
    
                            let logoAnimStep2 = setTimeout(() => {
                                logo[0].classList.add("active");
                                section2[0].style.display = "none";
                                clearTimeout(logoAnimStep2);
                            }, 50);
                        };
                    }, 4);
                }
            }
            document.body.removeEventListener('pointerdown', goToSection3)
            document.body.onpointermove = null;
            document.body.onpointerup = null;
        }
    }
}

function goToSection2Reverse (event) {
    event.preventDefault();
    document.body.setPointerCapture(event.pointerId);
    let x = event.screenX;

    document.body.onpointermove = function (event) {
        event.preventDefault();

        y = event.screenX;

        document.body.onpointerup = function () {
            event.preventDefault();

            if (section3[0].classList.contains('active') && x-y<=-(5*mobIndex)) {

                let index = 30;

                let transitionToSection2 = setInterval(() => {
                    index+=moveIndex;
                    section3[0].style.transform = 'translateX(' + index + '%)';
                    section3[0].style.webkitTransform = 'translateX(' + index + '%)';
                    section3[0].style.mozTransform = 'translateX(' + index + '%)';
                    let reverseIndex = index - (100+moveIndex);
                    section2[0].style.transform = 'translateX(' + reverseIndex + '%)';
                    section2[0].style.webkitTransform = 'translateX(' + reverseIndex + '%)';
                    section2[0].style.mozTransform = 'translateX(' + reverseIndex + '%)';


                    if (index >= 105){
                        clearInterval(transitionToSection2);
                        section3[0].classList.remove("active");
                        logo[0].classList.add("section2");
                        section2[0].classList.add("active");
                        section2[0].style.display = "flex";


                        let logoAnimReversStep1 = setTimeout(() => {
                            section3[0].style.transform = 'translateX(0%)';
                            section3[0].style.webkitTransform = 'translateX(0%)';
                            section3[0].style.mozTransform = 'translateX(0%)';
                            logo[0].classList.add("active");
                            section3[0].style.display = "none";
                            clearTimeout(logoAnimReversStep1);
                        }, 50);
                    };
                }, 4);
            }
            document.body.removeEventListener('pointerdown', goToSection2Reverse)
            document.body.onpointermove = null;
            document.body.onpointerup = null;
        }
    }
}

function checkCurrentSection() {
    if (section1[0].classList.contains('active') && !section2[0].classList.contains('active') && !section3[0].classList.contains('active')) {
        document.body.addEventListener('pointerdown', goToSection2);
        header.classList.remove('show');
    } else {
        if (section2[0].classList.contains('active') && !section1[0].classList.contains('active') && !section3[0].classList.contains('active')) {
            document.body.addEventListener('pointerdown', goToSection3);
            header.classList.remove('show');
        } else {
            if (section3[0].classList.contains('active') && !section1[0].classList.contains('active') && !section2[0].classList.contains('active')) {
            document.body.addEventListener('pointerdown', goToSection2Reverse);
            header.classList.add('show');
            }
        }
    }
}


let checkCurrentSectionInterval = setInterval(() => {
    checkCurrentSection();
}, 1000);


function headerInnerMenu () {
    const mobileBtn = document.getElementById('pcBtn');
    const innerMenu = document.getElementById('headerMenu');
    const arrow = document.getElementById('arrow');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
        arrow.classList.toggle('active');
    }));
};

function mobileHeaderInnerMenu () {
    const mobileBtn = document.getElementById('mobileBtn');
    const innerMenu = document.getElementById('mobileHeaderMenu');

    mobileBtn.addEventListener('click', (() => {
        innerMenu.classList.toggle('active');
        document.body.removeEventListener('pointerdown', goToSection2Reverse);
    }));
};

if (isMobile.any()) {
    mobileHeaderInnerMenu();
} else {
    headerInnerMenu();
};